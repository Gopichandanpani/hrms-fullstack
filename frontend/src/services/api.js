// src/api.js

const BASE_URL = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  console.error("REACT_APP_API_URL is not defined in environment variables");
}

export default BASE_URL;