import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router";
import PostEditor from "../../components/PostEditor/PostEditor.jsx";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
	return (
		<section className={styles.dashboard}>
			<h1>Dashboard Page</h1>
			<PostEditor />
		</section>
	);
}
