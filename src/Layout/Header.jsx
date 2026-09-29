


////=============================================================================

import React, { useState, useRef, useEffect } from "react";
import {
  MenuOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { useAuth } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const Header = ({ onToggle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Helper function to get cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Get token from cookie (assuming token is stored in cookie named 'token' or 'authToken')
      const token = getCookie('token') || getCookie('authToken');

      if (!token) {
        console.error('No token found in cookies');
        // Still proceed with local logout if no token found
        logout();
        navigate("/login");
        return;
      }

      // Call logout API
      const response = await fetch(`${API_URL}/api/Auth/logout`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: '' // Empty body as per the curl command
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Logout successful:', data.message);
        // Clear any additional cookies if needed
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // Call the context logout to clear local state
        logout();
        // Navigate to login page
        navigate("/login");
      } else {
        console.error('Logout API failed:', data.message);
        // Even if API fails, logout locally
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // If API call fails, still perform local logout
      logout();
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const registerUser = () => {
    navigate("/register");
  };

  const toggleFullscreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullscreen ||
      docEl.msRequestFullscreen;

    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
      setIsFullscreen(true);
    } else {
      cancelFullScreen.call(doc);
      setIsFullscreen(false);
    }
  };

  const iconColor = "#ffff";
  const hoverBgColor = "hover:bg-[#522EA8]/10";

  // Optional: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-[#547fd6] shadow-sm z-50">
      <button
        onClick={onToggle}
        className={`block md:hidden p-2 rounded-md ${hoverBgColor}`}
        title="Toggle Sidebar"
      >
        <MenuOutlined style={{ fontSize: 20, color: iconColor }} />
      </button>

      <button
        onClick={onToggle}
        className="p-2 rounded-md hover:bg-white/10"
      >
        <MenuFoldOutlined style={{ fontSize: 20, color: "#fff" }} />
      </button>

      <div className="relative flex items-center gap-2 ml-auto" ref={dropdownRef}>
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className={`p-2 rounded-md transition ${hoverBgColor}`}
        >
          {isFullscreen ? (
            <FullscreenExitOutlined style={{ color: iconColor }} className="text-lg" />
          ) : (
            <FullscreenOutlined style={{ color: iconColor }} className="text-lg" />
          )}
        </button>

        {/* Profile Icon & Image - Clickable for Dropdown */}
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${hoverBgColor}`}
          title="Account"
        >
          <UserOutlined style={{ color: iconColor }} className="text-lg block sm:hidden" />
          {/* <img
            src="https://i.pravatar.cc/30"
            alt="User"
            className="w-8 h-8 rounded-full border-2"
            style={{ borderColor: iconColor }}
          /> */}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-25 w-48 rounded-md shadow-lg bg-white border border-[#f0f0f0] z-50">
            <div className="px-4 py-3 border-b border-[#eee] flex items-center gap-3">
              {/* <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="w-10 h-10 rounded-full border-2"
                style={{ borderColor: iconColor }}
              /> */}
              {/* <div>
                <p className="text-sm font-semibold text-[#333]">Admin</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div> */}
            </div>
            <ul className="text-sm text-[#333] py-1">
              <li className="px-4 py-2 hover:bg-[#547fd6]/10 cursor-pointer rounded-md">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left"
                >
                  Profile
                </button>
              </li>
              <li className="px-4 py-2 hover:bg-[#FFF4E6] cursor-pointer rounded-md">
                <button
                  onClick={handleLogout}
                  className="w-full text-left"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? '🔓 Logging out...' : '🔓 Logout'}
                </button>
              </li>
              {/* <li className="px-4 py-2 hover:bg-[#FFF4E6] cursor-pointer rounded-md">
                <button onClick={registerUser} className="w-full text-left">
                  🧑‍💻 Register User
                </button>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;