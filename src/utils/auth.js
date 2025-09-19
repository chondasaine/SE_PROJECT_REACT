const BASE_URL = "http://localhost:3001";

export const registerUser = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Registration failed");
    }
    return res.json();
  });
};

export const loginUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        let errMsg = "Login failed";
        try {
          const errorData = JSON.parse(text);
          errMsg = errorData?.message || errMsg;
        } catch {
          errMsg = `Login failed with status ${res.status}`;
        }
        return Promise.reject(new Error(errMsg));
      });
    }
    return res.json();
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Token validation failed");
    }
    return res.json();
  });
};

export const getUserProfile = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch user profile");
    }
    return res.json();
  });
};
