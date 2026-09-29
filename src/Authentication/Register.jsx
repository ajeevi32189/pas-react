// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import bgImage from "../assets/PAS_BG.png";

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [roleName, setRoleName] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!email || !password || !roleName) {
//       setError("All fields are required");
//       return;
//     }

//     // Create user object
//     const newUser = {
//       email,
//       password,
//       roleName
//     };

//     // Save to localStorage
//     localStorage.setItem("registeredUser", JSON.stringify(newUser));

//     setSuccess("User registered successfully!");

//     // Clear fields
//     setEmail('');
//     setPassword('');
//     setRoleName('');

//     // Redirect to login after short delay
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-start px-4 bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black opacity-0"></div>

//       {/* Card */}
//       <div className="relative z-10 w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden">

//         {/* Decorative circles */}
//         <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2f70f5] opacity-20 rounded-full"></div>
//         <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#2f70f5] opacity-20 rounded-full"></div>

//         <div className="relative z-10">
//           <div className="w-16 h-16 bg-[#799fed] text-[#2f70f5] rounded-full flex items-center justify-center mx-auto mb-6 shadow">
//             📝
//           </div>

//           <h2 className="text-3xl font-bold text-center text-[#2f70f5] mb-2">
//             Register User
//           </h2>
//           <p className="text-sm text-gray-500 text-center mb-8">
//             Create a new account
//           </p>

//           {error && (
//             <div className="text-red-500 text-center mb-4">{error}</div>
//           )}

//           {success && (
//             <div className="text-green-500 text-center mb-4">{success}</div>
//           )}

//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
//             {/* Email */}
//             <input
//               type="text"
//               placeholder="Username / Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//             />

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pr-12"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? (
//                   // Eye Open
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                     strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                     <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 ) : (
//                   // Eye Closed
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                     strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
//                     <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M10.584 10.587a2 2 0 002.829 2.828" />
//                     <path strokeLinecap="round" strokeLinejoin="round"
//                       d="M9.88 5.09A9.953 9.953 0 0112 4.5c4.638 0 8.573 3.007 9.963 7.178a9.97 9.97 0 01-4.293 5.774M6.228 6.228A9.956 9.956 0 002.036 12c1.392 4.171 5.327 7.178 9.964 7.178 1.32 0 2.58-.23 3.75-.65" />
//                   </svg>
//                 )}
//               </button>
//             </div>

//             {/* Role */}
//             <input
//               type="text"
//               placeholder="Role Name (Admin/User)"
//               value={roleName}
//               onChange={(e) => setRoleName(e.target.value)}
//               className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//             />

//             <button
//               type="submit"
//               className="bg-blue-700 text-white py-3 rounded-full hover:bg-blue-800 transition-all duration-300"
//             >
//               REGISTER
//             </button>

//             <Link
//               to="/"
//               className="text-center text-sm text-blue-700 mt-2"
//             >
//               Already have an account? Login
//             </Link>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

//--------------------------------------------------------------------

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from "../assets/PAS_BG.png";
import { API_URL } from "../config";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password || !roleName) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/Account/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*"
          },
          body: JSON.stringify({
            email,
            password,
            roleName
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Registration failed");
      }

      // Success
      setSuccess("User registered successfully!");

      // Clear fields
      setEmail('');
      setPassword('');
      setRoleName('');

      // Redirect after delay
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start px-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2f70f5] opacity-20 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#2f70f5] opacity-20 rounded-full"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-[#799fed] text-[#2f70f5] rounded-full flex items-center justify-center mx-auto mb-6 shadow">
            📝
          </div>

          <h2 className="text-3xl font-bold text-center text-[#2f70f5] mb-2">
            Register User
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Create a new account
          </p>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {success && (
            <div className="text-green-500 text-center mb-4">{success}</div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <input
              type="text"
              placeholder="Username / Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M10.584 10.587a2 2 0 002.829 2.828" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9.88 5.09A9.953 9.953 0 0112 4.5c4.638 0 8.573 3.007 9.963 7.178a9.97 9.97 0 01-4.293 5.774M6.228 6.228A9.956 9.956 0 002.036 12c1.392 4.171 5.327 7.178 9.964 7.178 1.32 0 2.58-.23 3.75-.65" />
                  </svg>
                )}
              </button>
            </div>

            <input
              type="text"
              placeholder="Role Name (Admin/User)"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

            <button
              type="submit"
              className="bg-blue-700 text-white py-3 rounded-full hover:bg-blue-800 transition-all duration-300"
            >
              REGISTER
            </button>

            <Link
              to="/"
              className="text-center text-sm text-blue-700 mt-2"
            >
              Already have an account? Login
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;