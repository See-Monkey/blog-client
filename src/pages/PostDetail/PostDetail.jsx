import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/useAuth.js";
import { deletePost, getPublicPostBySlug } from "../../api/posts";

export default function PostDetail() {
	const { slug } = useParams();
	const { isAdmin } = useAuth();
	const navigate = useNavigate();

	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await getPublicPostBySlug(slug);
				setPost(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [slug]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!post) return <p>Post not found</p>;

	const handleDelete = async () => {
		await deletePost(post.id);
		navigate("/posts");
	};

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.content}</p>

			{isAdmin && (
				<div style={{ marginTop: "1rem" }}>
					<button onClick={() => navigate(`/posts/${post.slug}/edit`)}>
						Edit
					</button>
					<button onClick={handleDelete}>Delete</button>
				</div>
			)}
		</div>
	);
}
