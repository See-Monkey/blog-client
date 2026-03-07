import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../../context/useAuth.js";
import { getPublicProfile, getCommentsByUser } from "../../api/users.js";
import styles from "./UserProfile.module.css";
import formatDateTime from "../../functions/formatDateTime.js";
import defaultAvatar from "../../icons/comment-account.svg";

export default function UserProfile() {
	const { userId } = useParams();
	const { isAuthenticated, isAdmin } = useAuth();
	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [comments, setComments] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	const [userLoading, setUserLoading] = useState(true);
	const [commentLoading, setCommentLoading] = useState(true);
	const [error, setError] = useState(null);

	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

	// Get user
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getPublicProfile(userId);
				setUser(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setUserLoading(false);
			}
		};

		fetchUser();
	}, [userId]);

	// Get post comments
	useEffect(() => {
		const fetchComments = async () => {
			try {
				setCommentLoading(true);

				const data = await getCommentsByUser({ userId, page, limit: 10 });

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
		setCurrentPage(1);
	}, [userId, page]);

	if (userLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!user) return <p>Post not found</p>;

	const hasPrevious = currentPage > 1;
	const hasNext = currentPage < totalPages;

	return (
		<section className={styles.userProfileSection}>
			<div className={styles.profileContainer}>
				<img
					src={user.avatarUrl || defaultAvatar}
					alt="avatar"
					className={styles.avatar}
				/>

				<div className={styles.profileContentContainer}>
					<h2>{user.username}</h2>

					<div className={styles.rowContainer}>
						<h3>First Name:</h3>
						<p>{user.firstname}</p>
					</div>

					<div className={styles.rowContainer}>
						<h3>Last Name:</h3>
						<p>{user.lastname}</p>
					</div>
				</div>
			</div>

			<div className={styles.commentsContainer}>
				<h2>Comments</h2>
			</div>

			{/* Admin delete user */}
		</section>
	);
}
