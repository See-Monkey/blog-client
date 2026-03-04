import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useAuth } from "../../context/useAuth.js";
import { getPublicPosts } from "../../api/posts.js";
import styles from "./Posts.module.css";
import formatDateTime from "../../functions/formatDateTime.js";

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);

				const data = await getPublicPosts({ page, limit: 5 });

				setPosts(data.posts);
				setTotalPages(data.totalPages);
				setCurrentPage(data.currentPage);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [page]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	const hasPrevious = currentPage > 1;
	const hasNext = currentPage < totalPages;

	return (
		<section className={styles.postsSection}>
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
							<p className={styles.createdDate}>{createdDate}</p>
							{post.updatedAt !== post.createdAt && (
								<p className={styles.editedDate}>Edited: {editedDate}</p>
							)}
						</div>

						<div className={styles.commentsContainer}>
							<h4 className={styles.commentHeader}>Comments</h4>

							{post.comments.length === 0 && !isAuthenticated && (
								<p className={styles.noComments}>
									This post does not have any comments yet. Login to be the
									first!
								</p>
							)}

							{post.comments.length === 0 && isAuthenticated && (
								<p className={styles.noComments}>
									This post does not have any comments yet. Be the first!
								</p>
							)}

							{post.comments.map((comment) => {
								const createdDate = formatDateTime(comment.createdAt);
								const editedDate = formatDateTime(comment.updatedAt);

								return (
									<div key={comment.id} className={styles.commentContainer}>
										<p>{comment.content}</p>
										<p className={styles.createdDate}>{createdDate}</p>
										{comment.updatedAt !== comment.createdAt && (
											<p className={styles.editedDate}>Edited: {editedDate}</p>
										)}
									</div>
								);
							})}

							{
								// is authenticated, form to submit comment to this post
							}
						</div>

						<Link to={`/posts/${post.slug}`} className={styles.postDetailLink}>
							<button className={styles.postDetailBtn}>Show More</button>
						</Link>
					</div>
				);
			})}

			<div className={styles.pageContainer}>
				{hasPrevious && (
					<Link to={`/posts?page=${currentPage - 1}`}>
						<button>Previous</button>
					</Link>
				)}
				<p>
					Page {currentPage} of {totalPages}
				</p>
				{hasNext && (
					<Link to={`/posts?page=${currentPage + 1}`}>
						<button style={{ marginLeft: "0.5rem" }}>Next</button>
					</Link>
				)}
			</div>
		</section>
	);
}
