import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getPublicPosts } from "../../api/posts.js";
import styles from "./Posts.module.css";

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

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
			<h3 className={styles.pageNumHeader}>
				Page {currentPage} of {totalPages}
			</h3>

			{posts.map((post) => (
				<div key={post.id} className={styles.postContainer}>
					<h2 className={styles.postTitle}>{post.title}</h2>

					<div className={styles.postContentContainer}>
						<p className={styles.postContent}>{post.content}</p>
						<p className={styles.createdDate}>Created: </p>
						<p className={styles.editedDate}>Edited: </p>
					</div>

					<h4>Comments</h4>

					<div className={styles.commentsContainer}>
						{post.comments.map((comment) => (
							<div key={comment.id} className={styles.commentContainer}>
								<p>{comment.content}</p>
							</div>
						))}
					</div>

					<Link to={`/posts/${post.slug}`}>
						<button>Show More</button>
					</Link>
				</div>
			))}

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
