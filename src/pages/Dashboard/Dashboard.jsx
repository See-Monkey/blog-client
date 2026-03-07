import { useRef, useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { getAnalytics } from "../../api/analytics.js";
import { getAllPostsAdmin, deletePost, updatePost } from "../../api/posts.js";
import PostEditor from "../../components/PostEditor/PostEditor.jsx";
import styles from "./Dashboard.module.css";
import formatDateTime from "../../functions/formatDateTime.js";

export default function Dashboard() {
	const [analytics, setAnalytics] = useState(null);
	const [posts, setPosts] = useState([]);

	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const [analyticsLoading, setAnalyticsLoading] = useState(true);
	const [postLoading, setPostLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

	const postsHeaderRef = useRef(null);

	const scrollToPostsHeader = () => {
		if (postsHeaderRef.current) {
			postsHeaderRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	const [showConfirm, setShowConfirm] = useState(null);

	// Get post
	useEffect(() => {
		const fetchAnalytics = async () => {
			try {
				const data = await getAnalytics();
				setAnalytics(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setAnalyticsLoading(false);
			}
		};

		fetchAnalytics();
	}, [posts]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setPostLoading(true);

				const data = await getAllPostsAdmin({ page, limit: 5 });

				setPosts(data.posts);
				setTotalPages(data.totalPages);
				setCurrentPage(data.currentPage);
			} catch (err) {
				setError(err.message);
			} finally {
				setPostLoading(false);
			}
		};

		fetchPosts();
	}, [page]);

	if (error) return <p>Error: {error}</p>;

	const hasPrevious = currentPage > 1;
	const hasNext = currentPage < totalPages;

	const handleDelete = (postId) => {
		setShowConfirm(postId);
	};

	const confirmDelete = async () => {
		await deletePost(showConfirm);
		navigate("/dashboard");
	};

	const cancelDelete = () => {
		setShowConfirm(null);
	};

	const handleTogglePublish = async (postId, published) => {
		try {
			const updatedPost = await updatePost(postId, {
				published: !published,
			});

			setPosts((prev) => prev.map((p) => (p.id === postId ? updatedPost : p)));
		} catch (err) {
			console.error(err);
		}
	};

	const handleEdit = (postId) => {
		navigate(`/posts/${postId}/edit`);
	};

	return (
		<section className={styles.dashboardSection}>
			<div className={styles.analyticsContainer}>
				<h2 className={styles.analyticsHeader}>Analytics</h2>

				{analyticsLoading ? (
					<p className={styles.analyticsLoading}>Loading...</p>
				) : (
					<div className={styles.analyticsContent}>
						<div className={styles.statContainer}>
							<h3 className={styles.statHeader}>Users</h3>
							<p className={styles.statContent}>{analytics.users}</p>
						</div>

						<div className={styles.statContainer}>
							<h3 className={styles.statHeader}>Posts (Total)</h3>
							<p className={styles.statContent}>{analytics.totalPosts}</p>
						</div>

						<div className={styles.statContainer}>
							<h3 className={styles.statHeader}>Posts (Published)</h3>
							<p className={styles.statContent}>{analytics.publishedPosts}</p>
						</div>

						<div className={styles.statContainer}>
							<h3 className={styles.statHeader}>Comments</h3>
							<p className={styles.statContent}>{analytics.comments}</p>
						</div>
					</div>
				)}
			</div>

			<Link to="/users">
				<button className={styles.usersListBtn}>User List</button>
			</Link>

			<div className={styles.postEditorContainer}>
				<PostEditor />
			</div>

			<div className={styles.postsSection}>
				<h2 ref={postsHeaderRef} className={styles.postsHeader}>
					All Posts
				</h2>

				{postLoading ? (
					<p className={styles.postLoading}>Loading...</p>
				) : (
					<div className={styles.postsContainer}>
						{currentPage > 1 && (
							<h3 className={styles.pageNumHeader}>
								Page {currentPage} of {totalPages}
							</h3>
						)}

						{posts.map((post) => {
							const createdDate = formatDateTime(post.createdAt);
							const editedDate = formatDateTime(post.updatedAt);

							return (
								<div key={post.id} className={styles.postContainer}>
									<h2 className={styles.postTitle}>{post.title}</h2>

									<div className={styles.postContentContainer}>
										<p className={styles.postContent}>{post.content}</p>
										<p
											className={styles.postPublished}
										>{`Published: ${post.published ? "Yes" : "No"}`}</p>
										<p className={styles.createdDate}>{createdDate}</p>
										{post.updatedAt !== post.createdAt && (
											<p className={styles.editedDate}>Edited: {editedDate}</p>
										)}
									</div>

									<div className={styles.adminControls}>
										<button
											onClick={() =>
												handleTogglePublish(post.id, post.published)
											}
											className={styles.publishToggleBtn}
										>
											{post.published ? "Unpublish Post" : "Publish Post"}
										</button>

										<button
											onClick={() => handleEdit(post.id)}
											className={styles.editBtn}
										>
											Edit
										</button>

										<button
											onClick={() => handleDelete(post.id)}
											className={styles.deleteBtn}
										>
											Delete
										</button>
									</div>
								</div>
							);
						})}

						<div className={styles.pageContainer}>
							{hasPrevious && (
								<Link to={`/dashboard?page=${currentPage - 1}`}>
									<button
										className={styles.previousBtn}
										onClick={() => {
											scrollToPostsHeader();
											window.history.pushState(
												null,
												"",
												`/dashboard?page=${currentPage - 1}`,
											);
										}}
									>
										Previous
									</button>
								</Link>
							)}
							<p>
								Page {currentPage} of {totalPages}
							</p>
							{hasNext && (
								<Link to={`/dashboard?page=${currentPage + 1}`}>
									<button
										className={styles.nextBtn}
										onClick={() => {
											scrollToPostsHeader();
											window.history.pushState(
												null,
												"",
												`/dashboard?page=${currentPage + 1}`,
											);
										}}
									>
										Next
									</button>
								</Link>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Confirm post delete modal */}
			{showConfirm && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>
						<p>Are you sure you want to delete this post?</p>

						<div className={styles.deleteModalButtons}>
							<button onClick={confirmDelete}>Yes, Delete</button>
							<button onClick={cancelDelete}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
