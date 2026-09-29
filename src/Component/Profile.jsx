import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { API_URL } from "../config";

const SECRET_KEY = "12345678901234567890123456789012";

/* =========================================================
   Password Encryption
========================================================= */

const encryptPassword = (password) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

  // Random IV
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(password),
    key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  // IV + encrypted data
  const combined = iv.concat(encrypted.ciphertext);

  // Base64
  return CryptoJS.enc.Base64.stringify(combined);
};

/* =========================================================
   Profile
========================================================= */

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Auth token
  const authToken = Cookies.get("token");

  // User ID
  const userId = Cookies.get("ID");

  // Cancel ke baad kaha jana hai
  const fromPage =
    location.state?.from || "/classic-dashboard";

  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [passwordError, setPasswordError] =
    useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    userName: "",
    oldPassword: "",
    newPassword: "",
  });

  /* =========================================================
     Password Validation
  ========================================================= */

  const validatePassword = (password) => {
    if (!password) {
      return "";
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(password)) {
      return "Password must be strong (8 char, uppercase, lowercase, number, special)";
    }

    return "";
  };

  /* =========================================================
     Fetch Profile
  ========================================================= */

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://pasapi.puducherrysmartcity.in/api/profiles`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            accept: "*/*",
          },
        }
      );

      const data = response.data || {};

      setFormData((prev) => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        userName: data.userName || "",
      }));

      // Update cookies
      Cookies.set("Name", data.name || "");
      Cookies.set("Email", data.email || "");
      Cookies.set("Mobile", data.mobile || "");
      Cookies.set("UserName", data.userName || "");
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          "Failed to fetch profile",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     Initial Load
  ========================================================= */

  useEffect(() => {
    if (!authToken) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     Handle Change
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    /* -----------------------------------------
       Mobile Only Numbers
    ----------------------------------------- */

    if (
      name === "mobile" &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    /* -----------------------------------------
       New Password Validation
    ----------------------------------------- */

    if (name === "newPassword") {
      setPasswordError(
        validatePassword(value)
      );
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     Submit
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =======================================================
       Basic Validation
    ======================================================= */

    if (!formData.name.trim()) {
      Swal.fire(
        "Validation",
        "Name is required",
        "warning"
      );

      return;
    }

    if (!formData.email.trim()) {
      Swal.fire(
        "Validation",
        "Email is required",
        "warning"
      );

      return;
    }

    /* =======================================================
       Mobile Validation
    ======================================================= */

    if (
      formData.mobile &&
      formData.mobile.length !== 10
    ) {
      Swal.fire(
        "Validation",
        "Mobile number must be 10 digits",
        "warning"
      );

      return;
    }

    /* =======================================================
       Password Validation
    ======================================================= */

    if (formData.newPassword) {
      const error = validatePassword(
        formData.newPassword
      );

      if (error) {
        setPasswordError(error);

        return;
      }

      /* Old password required */

      if (!formData.oldPassword) {
        Swal.fire(
          "Validation",
          "Old password required",
          "warning"
        );

        return;
      }
    }

    try {
      setLoading(true);

      /* =====================================================
         Request Body
      ===================================================== */

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        userName: formData.userName,
      };

      /* =====================================================
         Password
      ===================================================== */

      if (formData.newPassword) {
        payload.oldPassword =
          encryptPassword(
            formData.oldPassword
          );

        payload.newPassword =
          encryptPassword(
            formData.newPassword
          );
      }

      /* =====================================================
         PUT API
      ===================================================== */

      await axios.put(
        `https://pasapi.puducherrysmartcity.in/api/profiles`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type":
              "application/json",
            accept: "*/*",
          },
        }
      );

      /* =====================================================
         Update Cookies
      ===================================================== */

      Cookies.set(
        "Name",
        formData.name
      );

      Cookies.set(
        "Email",
        formData.email
      );

      Cookies.set(
        "Mobile",
        formData.mobile
      );

      Cookies.set(
        "UserName",
        formData.userName
      );

      /* =====================================================
         Clear Password Fields
      ===================================================== */

      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
      }));

      setPasswordError("");

      /* =====================================================
         Success
      ===================================================== */

      await Swal.fire(
        "Success",
        "Profile Updated Successfully",
        "success"
      );

      /* =====================================================
         Logout / Clear Session
         
         NO LOGOUT API
         NO ACTIVITY LOG API
      ===================================================== */

      Cookies.remove("cda");
      Cookies.remove("Puid");
      Cookies.remove("UserName");
      Cookies.remove("Name");
      Cookies.remove("Email");
      Cookies.remove("Mobile");
      Cookies.remove("Role");
      Cookies.remove("ipAddress");

      sessionStorage.clear();
      localStorage.clear();

      /* =====================================================
         Login Page
      ===================================================== */

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Update failed";

      Swal.fire(
        "Error",
        typeof errorMessage === "string"
          ? errorMessage
          : "Update failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     Cancel
  ========================================================= */

  const handleCancel = () => {
    navigate(fromPage);
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">

      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

        {/* =================================================
            Header
        ================================================= */}

        <div className="flex items-center gap-3 bg-[#547fd6] px-6 py-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">

            <UserOutlined
              style={{
                color: "#fff",
                fontSize: 20,
              }}
            />

          </div>

          <div>

            <h1 className="text-lg font-semibold text-white">
              My Profile
            </h1>

            {userId && (
              <p className="text-xs text-white/80">
                PUID: {userId}
              </p>
            )}

          </div>

        </div>

        {/* =================================================
            Form
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="px-6 py-6"
        >

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Name */}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#333] outline-none transition focus:border-[#547fd6] focus:ring-2 focus:ring-[#547fd6]/20 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#333] outline-none transition focus:border-[#547fd6] focus:ring-2 focus:ring-[#547fd6]/20 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>

            {/* Mobile */}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Mobile
              </label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={loading}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#333] outline-none transition focus:border-[#547fd6] focus:ring-2 focus:ring-[#547fd6]/20 disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>

            {/* Username */}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Username
              </label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                readOnly
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-500 outline-none"
              />
            </div>

            {/* Old Password */}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                Old Password
              </label>

              <div className="relative">

                <input
                  type={
                    showOldPassword
                      ? "text"
                      : "password"
                  }
                  name="oldPassword"
                  autoComplete="current-password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm text-[#333] outline-none transition focus:border-[#547fd6] focus:ring-2 focus:ring-[#547fd6]/20 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowOldPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#547fd6]"
                >
                  {showOldPassword ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </button>

              </div>
            </div>

            {/* New Password */}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#333]">
                New Password
              </label>

              <div className="relative">

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  autoComplete="new-password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full rounded-md border px-3 py-2 pr-10 text-sm text-[#333] outline-none transition focus:ring-2 disabled:bg-gray-100 ${
                    passwordError
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-300 focus:border-[#547fd6] focus:ring-[#547fd6]/20"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#547fd6]"
                >
                  {showNewPassword ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </button>

              </div>

              {passwordError && (
                <p className="mt-1 text-xs text-red-500">
                  {passwordError}
                </p>
              )}
            </div>

          </div>

          {/* =================================================
              Buttons
          ================================================= */}

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-[#333] transition hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#547fd6] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#522EA8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Updating..."
                : "Update Profile"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Profile;
