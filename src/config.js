const API_URL =
  window?.env?.API_URL && window.env.API_URL !== "REPLACE__API_URL" ? window.env.API_URL : import.meta.env.VITE_API_URL;

export { API_URL };
