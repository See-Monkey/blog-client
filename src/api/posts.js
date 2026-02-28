import { apiFetch } from "./client.js";

// Get all public posts
export const getPublicPosts = (params = {}) => {
	const query = new URLSearchParams(params).toString();
	const endpoint = query ? `/posts?${query}` : "/posts";
	return apiFetch(endpoint);
};

// Get public post by slug
export const getPublicPostBySlug = (slug) => apiFetch(`/posts/${slug}`);

// Get all posts (admin)
export const getAllPostsAdmin = () => apiFetch("/posts/admin");

// Get any post by ID (admin)
export const getPostByIdAdmin = (postId) => apiFetch(`/posts/admin/${postId}`);

export const createPost = (data) =>
	apiFetch("/posts", {
		method: "POST",
		body: JSON.stringify(data),
	});

// Edit post (admin)
export const updatePost = (postId, data) =>
	apiFetch(`/posts/${postId}`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});

// Delete post (admin)
export const deletePost = (postId) =>
	apiFetch(`/posts/${postId}`, {
		method: "DELETE",
	});

// Get comments by post
export const getCommentsByPost = (slug) => apiFetch(`/posts/${slug}/comments`);

// Submit comment on post
export const createComment = (slug, data) =>
	apiFetch(`/posts/${slug}/comments`, {
		method: "POST",
		body: JSON.stringify(data),
	});
