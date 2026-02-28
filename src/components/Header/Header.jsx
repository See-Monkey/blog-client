import { useAuth } from "../../context/useAuth.js";
import { Link } from "react-router";

export default function Header() {
	const { isAdmin, isAuthenticated, logout } = useAuth();

	return (
		<header>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/posts">Posts</Link>

				{isAdmin && <Link to="/dashboard">Admin Dashboard</Link>}

				{isAuthenticated ? (
					<button onClick={logout}>Logout</button>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</nav>
		</header>
	);
}
