import { useState } from "react";
import { createPost } from "../../api/posts";
import styles from "./PostEditor.module.css";

export default function PostEditor({ onPostCreated }) {
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
			onPostCreated();
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.postEditorForm}>
			<h2 className={styles.postEditorHeader}>Create Post</h2>

			<div className={styles.titleContainer}>
				<label>Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			<div className={styles.contentContainer}>
				<label>Content</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={10}
					required
				/>
			</div>

			<div className={styles.publishedContainer}>
				<label>
					<input
						type="checkbox"
						checked={published}
						onChange={(e) => setPublished(e.target.checked)}
						className={styles.publishedCheckbox}
					/>
					Published
				</label>
			</div>

			<button type="submit" disabled={loading} className={styles.submitBtn}>
				{loading ? "Creating..." : "Create Post"}
			</button>

			{error && <p>{error}</p>}
			{success && <p>Post created successfully.</p>}
		</form>
	);
}
