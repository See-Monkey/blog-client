import { useAuth } from "../../context/useAuth.js";
import { deletePost } from "../../api/posts";
import { useNavigate } from "react-router";

export default function PostDetail({ post }) {
	const { isAdmin } = useAuth();
	const navigate = useNavigate();

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
