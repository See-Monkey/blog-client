import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router";
import { getAnalytics } from "../../api/analytics.js";
import PostEditor from "../../components/PostEditor/PostEditor.jsx";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
	const [analytics, setAnalytics] = useState(null);

	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	const [analyticsLoading, setAnalyticsLoading] = useState(true);
	const [postLoading, setPostLoading] = useState(true);
	const [error, setError] = useState(null);

	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

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
	}, [analytics]);

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

			<div className={styles.postEditorContainer}>
				<PostEditor />
			</div>

			<div className={styles.postsContainer}>
				<h2 className={styles.postsHeader}>All Posts</h2>
			</div>
		</section>
	);
}
