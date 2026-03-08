import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMe, updateMe, changeMyPassword, deleteUser } from "../../api/users";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import styles from "./Account.module.css";
import defaultAvatar from "../../icons/comment-account.svg";

export default function Account() {
	const navigate = useNavigate();

	const [user, setUser] = useState(null);

	const [userLoading, setUserLoading] = useState(true);
	const [error, setError] = useState(null);

	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		avatarUrl: "",
	});

	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [showConfirm, setShowConfirm] = useState(false);

	// Get account
	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const data = await getMe();
				setUser(data);

				setForm({
					firstname: data.firstname || "",
					lastname: data.lastname || "",
					avatarUrl: data.avatarUrl || "",
				});
			} catch (err) {
				setError(err.message);
			} finally {
				setUserLoading(false);
			}
		};

		fetchAccount();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		setError(null);

		try {
			const updatedUser = await updateMe(form);
			setUser(updatedUser);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleChangePassword = async (e) => {
		e.preventDefault();

		setError(null);

		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			setError("New passwords do not match");
			return;
		}

		try {
			await changeMyPassword({
				currentPassword: passwordForm.currentPassword,
				newPassword: passwordForm.newPassword,
			});

			setPasswordForm({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch (err) {
			setError(err.message);
		}
	};

	const handleDelete = () => {
		setShowConfirm(true);
	};

	const confirmDelete = async () => {
		await deleteUser(user.id);
		navigate("/posts");
	};

	const cancelDelete = () => {
		setShowConfirm(false);
	};

	if (userLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<section className={styles.accountSection}>
			<div className={styles.accountContainer}>
				<h2 className={styles.accountHeader}>My Account</h2>
				<div className={styles.avatarContainer}>
					<img
						src={user.avatarUrl || defaultAvatar}
						alt="avatar"
						className={styles.avatar}
					/>
					<div className={styles.accountContentContainer}>
						<h2 className={styles.username}>{user.username}</h2>
						<form onSubmit={handleUpdate} className={styles.profileForm}>
							<h3 className={styles.formHeader}>Update My Profile</h3>
							<label>
								First Name:
								<input
									name="firstname"
									value={form.firstname}
									onChange={handleChange}
								/>
							</label>

							<label>
								Last Name:
								<input
									name="lastname"
									value={form.lastname}
									onChange={handleChange}
								/>
							</label>

							<label>
								Avatar URL:
								<input
									name="avatarUrl"
									value={form.avatarUrl}
									onChange={handleChange}
								/>
							</label>
							<button type="submit" className={styles.updateProfileBtn}>
								Update Profile
							</button>
						</form>
					</div>
				</div>

				<form onSubmit={handleChangePassword} className={styles.passwordForm}>
					<h3 className={styles.formHeader}>Change My Password</h3>
					<label>
						Current Password:
						<input
							type="password"
							name="currentPassword"
							value={passwordForm.currentPassword}
							onChange={handlePasswordChange}
							required
						/>
					</label>

					<label>
						New Password:
						<input
							type="password"
							name="newPassword"
							value={passwordForm.newPassword}
							onChange={handlePasswordChange}
							required
						/>
					</label>

					<label>
						Confirm New Password:
						<input
							type="password"
							name="confirmPassword"
							value={passwordForm.confirmPassword}
							onChange={handlePasswordChange}
							required
						/>
					</label>
					<button type="submit" className={styles.changePasswordBtn}>
						Change Password
					</button>
				</form>

				<div className={styles.deleteContainer}>
					<h3 className={styles.formHeader}>Delete My Account</h3>
					<button
						type="button"
						onClick={handleDelete}
						className={styles.deleteBtn}
					>
						Delete
					</button>
				</div>
			</div>

			<ConfirmModal
				isOpen={showConfirm}
				message="Are you sure you want to delete this account?"
				confirmText="Delete Forever"
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>
		</section>
	);
}
