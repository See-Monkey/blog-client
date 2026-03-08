import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllUsers } from "../../api/users.js";
import styles from "./UsersList.module.css";
import formatDateTime from "../../functions/formatDateTime.js";
import defaultAvatar from "../../icons/comment-account.svg";

export default function UsersList() {
	const [users, setUsers] = useState([]);

	const [userLoading, setUserLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getAllUsers();
				setUsers(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setUserLoading(false);
			}
		};

		fetchUsers();
	}, []);

	if (userLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<section className={styles.usersListSection}>
			<div className={styles.usersContainer}>
				<h2 className={styles.usersHeader}>Users</h2>
				{users.map((user) => {
					const createdDate = formatDateTime(user.createdAt);
					return (
						<div key={user.id} className={styles.userContainer}>
							<Link to={`/users/${user.id}`}>
								<img
									src={user.avatarUrl || defaultAvatar}
									alt="avatar"
									className={styles.avatar}
								/>
							</Link>
							<div className={styles.userContentContainer}>
								<Link to={`/users/${user.id}`}>
									<h4>{user.username}</h4>
								</Link>

								<div className={styles.nameContainer}>
									<p className={styles.firstname}>
										First Name: <strong>{user.firstname}</strong>
									</p>
									<p className={styles.firstname}>
										Last Name: <strong>{user.lastname}</strong>
									</p>
								</div>

								<p className={styles.createdDate}>
									Account Created: {createdDate}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
