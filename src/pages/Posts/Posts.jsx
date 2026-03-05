import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useAuth } from "../../context/useAuth.js";
import { getPublicPosts } from "../../api/posts.js";
import styles from "./Posts.module.css";
import formatDateTime from "../../functions/formatDateTime.js";
import truncateAtWord from "../../functions/truncateAtWord.js";
import defaultAvatar from "../../icons/comment-account.svg";

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

	const MAX_POST = 1000;
	const MAX_COMMENT = 300;

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
				const postIsTruncated = post.content.length > MAX_POST;

				return (
					<div key={post.id} className={styles.postContainer}>
						<Link to={`/posts/${post.slug}`}>
							<h2 className={styles.postTitle}>{post.title}</h2>
						</Link>

						<div className={styles.postContentContainer}>
							<p className={styles.postContent}>
								{postIsTruncated
									? truncateAtWord(post.content, MAX_POST)
									: post.content}
							</p>
							<p className={styles.createdDate}>{createdDate}</p>
							{post.updatedAt !== post.createdAt && (
								<p className={styles.editedDate}>Edited: {editedDate}</p>
							)}
						</div>

						{/* Button only visible if post is truncated */}
						<Link
							to={`/posts/${post.slug}`}
							className={`${styles.postTruncatedLink} ${postIsTruncated ? styles.active : ""}`}
						>
							<button
								className={`${styles.postTruncatedBtn} ${postIsTruncated ? styles.active : ""}`}
							>
								Show More
							</button>
						</Link>

						<div className={styles.commentsContainer}>
							<h4 className={styles.commentHeader}>
								Comments{" "}
								{post._count.comments > 0 ? `(${post._count.comments})` : ""}
							</h4>

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
								const commentIsTruncated = comment.content.length > MAX_COMMENT;

								const username = comment.author.firstname
									? `${comment.author.firstname} ${comment.author.lastname ? comment.author.lastname : ""}`
									: comment.author.username.split("@")[0];

								return (
									<div key={comment.id} className={styles.commentContainer}>
										<Link to={`/users/${comment.author.id}`}>
											<img
												src={comment.author.avatarUrl || defaultAvatar}
												alt="avatar"
												className={styles.avatar}
											/>
										</Link>
										<div className={styles.commentContentContainer}>
											<Link to={`/users/${comment.author.id}`}>
												<h4>{username}</h4>
											</Link>
											<p>
												{commentIsTruncated
													? truncateAtWord(comment.content, MAX_COMMENT)
													: comment.content}
											</p>
											<p className={styles.createdDate}>{createdDate}</p>
											{comment.updatedAt !== comment.createdAt && (
												<p className={styles.editedDate}>
													Edited: {editedDate}
												</p>
											)}
										</div>
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
						<button className={styles.previousBtn}>Previous</button>
					</Link>
				)}
				<p>
					Page {currentPage} of {totalPages}
				</p>
				{hasNext && (
					<Link to={`/posts?page=${currentPage + 1}`}>
						<button className={styles.nextBtn}>Next</button>
					</Link>
				)}
			</div>
		</section>
	);
}
