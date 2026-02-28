import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth.js";

export default function ProtectedRoute({ children, requireAdmin = false }) {
	const { isAuthenticated, isAdmin, loading } = useAuth();

	if (loading) return null;

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (requireAdmin && !isAdmin) {
		return <Navigate to="/" replace />;
	}

	return children;
}
