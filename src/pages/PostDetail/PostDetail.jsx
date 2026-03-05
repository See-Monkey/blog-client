import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../../context/useAuth.js";
import {
	deletePost,
	getPublicPostBySlug,
	getCommentsByPost,
} from "../../api/posts";
import styles from "./PostDetail.module.css";
import formatDateTime from "../../functions/formatDateTime.js";
import defaultAvatar from "../../icons/comment-account.svg";

export default function PostDetail() {
	const { slug } = useParams();
	const { isAuthenticated, isAdmin } = useAuth();
	const navigate = useNavigate();

	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	const [postLoading, setPostLoading] = useState(true);
	const [commentLoading, setCommentLoading] = useState(true);
	const [error, setError] = useState(null);

	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await getPublicPostBySlug(slug);
				setPost(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setPostLoading(false);
			}
		};

		fetchPost();
		setCurrentPage(1);
	}, [slug]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				setCommentLoading(true);

				const data = await getCommentsByPost({ slug, page, limit: 10 });

				setComments(data.comments);
				setTotalPages(data.totalPages);
				setCurrentPage(data.currentPage);
				setTotalCount(data.totalCount);
			} catch (err) {
				setError(err.message);
			} finally {
				setCommentLoading(false);
			}
		};
		fetchComments();
	}, [slug, page]);

	if (postLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!post) return <p>Post not found</p>;

	const hasPrevious = currentPage > 1;
	const hasNext = currentPage < totalPages;

	const handleDelete = async () => {
		await deletePost(post.id);
		navigate("/posts");
	};

	const createdDate = formatDateTime(post.createdAt);
	const editedDate = formatDateTime(post.updatedAt);

	return (
		<section className={styles.postDetailSection}>
			<div className={styles.postContainer}>
				<h2 className={styles.postTitle}>{post.title}</h2>

				{/* Post content */}
				<div className={styles.postContentContainer}>
					<p className={styles.postContent}>{post.content}</p>
					<p className={styles.createdDate}>{createdDate}</p>
					{post.updatedAt !== post.createdAt && (
						<p className={styles.editedDate}>Edited: {editedDate}</p>
					)}
				</div>

				{/* Admin controls */}
				{isAdmin && (
					<div className={styles.adminControls}>
						<button onClick={handleDelete}>Delete</button>
					</div>
				)}

				{/* Submit comment */}
				{isAuthenticated && (
					<div className={styles.submitCommentContainer}>
						<h4 className={styles.commentHeader}>Submit Comment</h4>
					</div>
				)}

				<div className={styles.commentsContainer}>
					<h4 className={styles.commentHeader}>Comments {`(${totalCount})`}</h4>

					{comments.length === 0 && !isAuthenticated && (
						<p className={styles.noComments}>
							This post does not have any comments yet. Login to be the first!
						</p>
					)}

					{comments.length === 0 && isAuthenticated && (
						<p className={styles.noComments}>
							This post does not have any comments yet. Be the first!
						</p>
					)}

					{comments.map((comment) => {
						const createdDate = formatDateTime(comment.createdAt);
						const editedDate = formatDateTime(comment.updatedAt);

						const username = comment.author.firstname
							? `${comment.author.firstname} ${comment.author.lastname ? comment.author.lastname : ""}`
							: comment.author.username.split("@")[0];

						if (commentLoading) return <p>Loading...</p>;

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
									<p>{comment.content}</p>
									<p className={styles.createdDate}>{createdDate}</p>
									{comment.updatedAt !== comment.createdAt && (
										<p className={styles.editedDate}>Edited: {editedDate}</p>
									)}
								</div>
							</div>
						);
					})}

					{totalPages !== 0 && (
						<div className={styles.pageContainer}>
							{hasPrevious && (
								<Link to={`/posts/${slug}?page=${currentPage - 1}`}>
									<button className={styles.previousBtn}>Previous</button>
								</Link>
							)}
							<p>
								Page {currentPage} of {totalPages}
							</p>
							{hasNext && (
								<Link to={`/posts/${slug}?page=${currentPage + 1}`}>
									<button className={styles.nextBtn}>Next</button>
								</Link>
							)}
						</div>
					)}

					{
						// is authenticated, form to submit comment to this post
					}
				</div>
			</div>
		</section>
	);
}
