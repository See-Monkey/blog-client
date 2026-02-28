import { useEffect, useState } from "react";
import * as authApi from "../api/auth";
import { getMe } from "../api/users";
import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
	const [token, setToken] = useState(() => localStorage.getItem("token"));

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const logout = () => {
		authApi.logout();
		setToken(null);
		setUser(null);
	};

	useEffect(() => {
		async function initializeAuth() {
			if (!token) {
				setLoading(false);
				return;
			}

			try {
				const currentUser = await getMe();
				setUser(currentUser);
			} catch {
				logout();
			} finally {
				setLoading(false);
			}
		}

		initializeAuth();
	}, [token]);

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				role: user?.role ?? null,
				isAuthenticated: !!user,
				isAdmin: user?.role === "ADMIN",
				loading,
				login: async (data) => {
					const res = await authApi.login(data);
					if (res?.token) setToken(res.token);
					return res;
				},
				register: async (data) => {
					const res = await authApi.register(data);
					if (res?.token) setToken(res.token);
					return res;
				},
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
