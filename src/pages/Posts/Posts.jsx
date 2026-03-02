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
			<h1>
				Posts (Page {currentPage} of {totalPages})
			</h1>

			{posts.map((post) => (
				<div key={post.id}>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
					<h4>Comments</h4>

					{post.comments.map((comment) => (
						<div key={comment.id}>
							<p>{comment.content}</p>
						</div>
					))}

					<Link to={`/posts/${post.slug}`}>
						<button>Show More</button>
					</Link>
				</div>
			))}

			<div style={{ marginTop: "1rem" }}>
				{hasPrevious && (
					<Link to={`/posts?page=${currentPage - 1}`}>
						<button>Previous</button>
					</Link>
				)}

				{hasNext && (
					<Link to={`/posts?page=${currentPage + 1}`}>
						<button style={{ marginLeft: "0.5rem" }}>Next</button>
					</Link>
				)}
			</div>
		</section>
	);
}
