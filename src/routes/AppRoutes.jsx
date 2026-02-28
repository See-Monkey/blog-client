import { createBrowserRouter } from "react-router";
import App from "../App.jsx";

import Home from "../pages/Home/Home.jsx";
import Posts from "../pages/Posts/Posts.jsx";
import PostDetail from "../pages/PostDetail/PostDetail.jsx";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "posts", element: <Posts /> },
			{ path: "posts/:slug", element: <PostDetail /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
			{
				path: "dashboard",
				element: (
					<ProtectedRoute requireAdmin>
						<Dashboard />
					</ProtectedRoute>
				),
			},
		],
	},
]);

export default router;
