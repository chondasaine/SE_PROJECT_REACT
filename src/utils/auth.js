import { checkResponse } from "./checkResponse";
import { baseUrl } from "../utils/constants";

export const registerUser = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Registration failed:", err.message);
      throw err;
    });
};

export const loginUser = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Login failed:", err.message);
      throw err;
    });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Token Validation failed:", err.message);
      throw err;
    });
};

export const getUserProfile = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch user profile:", err.message);
      throw err;
    });
};
