import { useState } from "react";
import { createPost } from "../../api/posts";

export default function PostEditor() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [published, setPublished] = useState(false);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			await createPost({
				title,
				content,
				published,
			});

			setTitle("");
			setContent("");
			setPublished(false);
			setSuccess(true);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Create Post</h2>

			<div>
				<label>Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>Content</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={10}
					required
				/>
			</div>

			<div>
				<label>
					<input
						type="checkbox"
						checked={published}
						onChange={(e) => setPublished(e.target.checked)}
					/>
					Published
				</label>
			</div>

			<button type="submit" disabled={loading}>
				{loading ? "Creating..." : "Create Post"}
			</button>

			{error && <p>{error}</p>}
			{success && <p>Post created successfully.</p>}
		</form>
	);
}
