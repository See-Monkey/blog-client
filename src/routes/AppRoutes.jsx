import { createBrowserRouter } from "react-router";
import App from "../App.jsx";

import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Posts from "../pages/Posts/Posts.jsx";
import PostDetail from "../pages/PostDetail/PostDetail.jsx";
import UserProfile from "../pages/UserProfile/UserProfile.jsx";
import Account from "../pages/Account/Account.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import UsersList from "../pages/UsersList/UsersList.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
			{ path: "posts", element: <Posts /> },
			{ path: "posts/:slug", element: <PostDetail /> },
			{ path: "users/:userId", element: <UserProfile /> },
			{ path: "account", element: <Account /> },
			{
				path: "dashboard",
				element: (
					<ProtectedRoute requireAdmin>
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{
				path: "users",
				element: (
					<ProtectedRoute requireAdmin>
						<UsersList />
					</ProtectedRoute>
				),
			},
		],
	},
]);

export default router;
