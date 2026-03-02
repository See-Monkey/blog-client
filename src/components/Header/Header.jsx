import { useAuth } from "../../context/useAuth.js";
import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";
import logo from "../../images/see-monkey-logo-alpha-black.png";

export default function Header() {
	const { isAdmin, isAuthenticated, logout } = useAuth();

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.headerTop}>
					<div className={styles.logoContainer}>
						<div className={styles.imgContainer}>
							<img
								src={logo}
								alt="monkey with glasses"
								className={styles.logoImg}
							/>
						</div>
						<div className={styles.logoTextContainer}>
							<h2 className={styles.logoFront}>Monkey</h2>
							<h1 className={styles.logoCenter}>See-Monkey</h1>
							<h2 className={styles.logoEnd}>Do</h2>
						</div>
					</div>
					<div className={styles.authContainer}>
						{isAuthenticated ? (
							<button onClick={logout} className={styles.logoutBtn}>
								Logout
							</button>
						) : (
							<>
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive ? styles.active : undefined
									}
								>
									Login
								</NavLink>
								<NavLink
									to="/register"
									className={({ isActive }) =>
										isActive ? styles.active : undefined
									}
								>
									Register
								</NavLink>
							</>
						)}
					</div>
				</div>
				<div className={styles.headerBottom}>
					<nav className={styles.nav}>
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/posts"
							className={({ isActive }) =>
								isActive ? styles.active : undefined
							}
						>
							Posts
						</NavLink>
						{isAdmin && (
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									isActive ? styles.active : undefined
								}
							>
								Dashboard
							</NavLink>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}
