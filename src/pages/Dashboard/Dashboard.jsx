import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router";
import PostEditor from "../../components/PostEditor/PostEditor.jsx";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
	return (
		<section className={styles.dashboardSection}>
			<div className={styles.analyticsContainer}>
				<h2>Analytics</h2>
			</div>

			<div className={styles.postEditorContainer}>
				<PostEditor />
			</div>

			<div className={styles.postsContainer}>
				<h2>All Posts</h2>
			</div>
		</section>
	);
}
