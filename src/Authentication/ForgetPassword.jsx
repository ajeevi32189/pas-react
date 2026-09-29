import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from "../config";
import bgImage from "../assets/PAS_BG.png";
import CryptoJS from "crypto-js";


const SECRET_KEY = "12345678901234567890123456789012";
const encryptPassword = (password) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

  // 🔥 random IV generate (same as backend)
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(password),
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  // 🔥 IV + ciphertext combine (IMPORTANT)
  const combined = iv.concat(encrypted.ciphertext);

  // 🔥 Base64 return (same as backend expects)
  return CryptoJS.enc.Base64.stringify(combined);
};

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Forgot Password, 2: Reset Password
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for show/hide password

  // Validation errors
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [captchaId, setCaptchaId] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const captchaFetched = useRef(false);

  const fetchCaptcha = async () => {
    setCaptchaLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}/api/Auth/generate-captcha`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );

      const data = response.data;

      setCaptchaId(data.captchaKey);
      setCaptchaText(data.captchaCode);
      setCaptchaInput("");
    } catch (err) {
      setError("Failed to load captcha. Please refresh.");
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    if (captchaFetched.current) return;

    captchaFetched.current = true;
    fetchCaptcha();
  }, []);
  // ─── Validate Username (only lowercase letters and numbers) ────────────
  const validateUsername = (value) => {
    if (value && !/^[a-z0-9]+$/.test(value)) {
      setUsernameError("Username can only contain lowercase letters and numbers");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  // ─── Validate Password (first letter capital) ─────────
  const validatePassword = (value) => {
    if (value && value.length > 0) {
      if (!/^[A-Z]/.test(value)) {
        setPasswordError("First letter of password must be capital");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    } else {
      setPasswordError("");
      return true;
    }
  };

  // ─── Handle Username Change ────────────
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateUsername(value);
  };

  // ─── Handle Password Change ─────────
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername(email);

    if (!isUsernameValid) {
      setError("Please fix the validation errors above");
      return;
    }

    if (!captchaInput) {
      setError("Please enter captcha");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      console.log("Calling forgot-password API...");

      const response = await axios.post(
        `${API_URL}/api/Auth/forgot-password`,
        {
          username: email,
          captcha: captchaInput,
          captchaId: captchaId,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Forgot Password Response:", response.data);

      if (response.data.success) {
        setMessage("OTP sent to your registered email!");
        setStep(2);
        setError(null);

        // Step 2 ke liye fresh captcha
        await fetchCaptcha();
      } else {
        setError(
          response.data.message ||
          "Failed to send OTP. Please try again."
        );
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to send OTP. Please try again."
      );

      // API fail hone par captcha refresh
      await fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate OTP
    if (!otp.trim()) {
      setError("Please enter OTP");
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    // Validate password first letter
    const isPasswordValid = validatePassword(newPassword);

    if (!isPasswordValid) {
      setError("Please fix the validation errors above");
      return;
    }

    // Validate captcha
    if (!captchaInput.trim()) {
      setError("Please enter captcha");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const encryptedPassword = encryptPassword(newPassword);

      console.log("Calling reset-password API...");
      console.log({
        username: email,
        otp: otp,
        newPassword: encryptedPassword,
        captcha: captchaInput,
        captchaId: captchaId,
      });

      const response = await axios.post(
        `${API_URL}/api/Auth/reset-password`,
        {
          username: email,
          otp: otp,
          newPassword: encryptedPassword,
          captcha: captchaInput,
          captchaId: captchaId,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Reset Password Response:", response.data);

      if (response.data.success) {
        setMessage(
          "Password reset successful! Redirecting to login..."
        );

        setError(null);

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(
          response.data.message ||
          "Failed to reset password. Please try again."
        );
      }
    } catch (err) {
      console.error("Reset Password Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to reset password. Please try again."
      );

      // Generate fresh captcha only when reset API fails
      await fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.history.back();
  };

  const handleBackToForgot = () => {
    setStep(1);
    setOtp('');
    setNewPassword('');
    setError(null);
    setMessage(null);
    setShowPassword(false);
    setUsernameError("");
    setPasswordError("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div
      className="min-h-screen flex items-center justify-start px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-1"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2f70f5] opacity-20 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#2f70f5] opacity-20 rounded-full"></div>

        <div className="relative z-10">

          {/* Icon */}
          <div className="w-16 h-16 bg-[#799fed] text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow">
            {step === 1 ? "🔑" : "🔄"}
          </div>

          <h2 className="text-3xl font-bold text-center text-[#2f70f5] mb-2">
            Public Addressing System
          </h2>

          {/* Title */}
          <h2 className="text-md font-bold text-center text-[#2f70f5] mb-2">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            {step === 1
              ? "Enter your username to receive OTP"
              : `Enter OTP sent to ${email}`}
          </p>

          {/* Messages */}
          {error && (
            <div className="text-red-500 text-center mb-4 text-sm">{error}</div>
          )}
          {message && (
            <div className="text-green-600 text-center mb-4 text-sm">{message}</div>
          )}

          {/* Form - Step 1: Forgot Password */}
          {step === 1 && (
            <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={email}
                  onChange={handleUsernameChange}
                  required
                  className={`w-full px-4 py-3 rounded-full border ${usernameError ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm`}
                />
                {usernameError && (
                  <p className="text-red-500 text-xs mt-1 ml-3">{usernameError}</p>
                )}
                {/* <p className="text-gray-500 text-xs mt-1 ml-3">
                  * Username can only contain lowercase letters and numbers
                </p> */}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-center">
                  {captchaLoading ? (
                    <span className="text-gray-400 text-sm">
                      Loading...
                    </span>
                  ) : (
                    <span className="font-mono font-bold text-lg tracking-[0.3em] text-gray-700 select-none">
                      {captchaText}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={fetchCaptcha}
                  disabled={captchaLoading}
                  className="text-blue-600 text-xl"
                  title="Refresh captcha"
                >
                  ↻
                </button>

                <input
                  type="text"
                  placeholder="Enter captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 text-white py-3 rounded-full hover:bg-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Form - Step 2: Reset Password */}
          {step === 2 && (
            <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              {/* New Password with Show/Hide functionality */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                    className={`w-full px-4 py-3 rounded-full border ${passwordError ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pr-12`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.584 10.587a2 2 0 002.829 2.828" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 5.09A9.953 9.953 0 0112 4.5c4.638 0 8.573 3.007 9.963 7.178a9.97 9.97 0 01-4.293 5.774M6.228 6.228A9.956 9.956 0 002.036 12c1.392 4.171 5.327 7.178 9.964 7.178 1.32 0 2.58-.23 3.75-.65" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1 ml-3">{passwordError}</p>
                )}
                {/* <p className="text-gray-500 text-xs mt-1 ml-3">
                  * First letter must be capital, special characters and numbers allowed
                </p> */}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-center">
                  {captchaLoading ? (
                    <span className="text-gray-400 text-sm">
                      Loading...
                    </span>
                  ) : (
                    <span className="font-mono font-bold text-lg tracking-[0.3em] text-gray-700 select-none">
                      {captchaText}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={fetchCaptcha}
                  disabled={captchaLoading}
                  className="text-blue-600 text-xl"
                  title="Refresh captcha"
                >
                  ↻
                </button>

                <input
                  type="text"
                  placeholder="Enter captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 text-white py-3 rounded-full hover:bg-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>

              <button
                type="button"
                onClick={handleBackToForgot}
                className="text-blue-700 text-sm hover:underline"
              >
                ← Back to Forgot Password
              </button>
            </form>
          )}

          {/* Back to Login */}
          <p className="text-sm text-center mt-6">
            <span
              className="text-blue-700 cursor-pointer hover:underline"
              onClick={handleBackToLogin}
            >
              ← Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;