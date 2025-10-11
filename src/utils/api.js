import { checkResponse } from "./checkResponse";
import { baseUrl } from "../utils/constants";

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch items:", err.message);
      throw err;
    });
}

function saveItems({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to save items:", err.message);
      throw err;
    });
}

function deleteItems(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to delete items:", err.message);
      throw err;
    });
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to like item:", err.message);
      throw err;
    });
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to remove like:", err.message);
      throw err;
    });
}

function updateUserProfile(data, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Profile update failed:", err.message);
      throw err;
    });
}

function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to get user:", err.message);
      throw err;
    });
}

export {
  getItems,
  saveItems,
  deleteItems,
  addCardLike,
  removeCardLike,
  updateUserProfile,
  getUserData,
};
