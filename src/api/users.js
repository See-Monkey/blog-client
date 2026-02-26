import { apiFetch } from "./client";

// Get account details
export const getMe = () => apiFetch("/users/me");

// Update account details
export const updateMe = (data) =>
	apiFetch("/users/me", {
		method: "PATCH",
		body: JSON.stringify(data),
	});

export const changeMyPassword = (data) =>
	apiFetch("/users/me/password", {
		method: "PATCH",
		body: JSON.stringify(data),
	});

// Admin get all users
export const getAllUsers = () => apiFetch("/users");

// Get public profile
export const getPublicProfile = (userId) => apiFetch(`/users/${userId}`);

// Admin delete user
export const deleteUser = (userId) =>
	apiFetch(`/users/${userId}`, {
		method: "DELETE",
	});

// Get comments by user
export const getCommentsByUser = (userId) =>
	apiFetch(`/users/${userId}/comments`);
