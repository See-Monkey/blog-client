import { apiFetch } from "./client";

export const updateComment = (commentId, data) =>
	apiFetch(`/comments/${commentId}`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});

export const deleteComment = (commentId) =>
	apiFetch(`/comments/${commentId}`, {
		method: "DELETE",
	});
