import { useState } from "react";
import { useAuth } from "../../context/useAuth.js";
import { useNavigate } from "react-router";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const [error, setError] = useState(null);

	function handleChange(e) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);

		try {
			await login(form);
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			{error && <p>{error}</p>}

			<input
				name="username"
				type="email"
				placeholder="Email"
				value={form.username}
				onChange={handleChange}
			/>

			<input
				name="password"
				type="password"
				placeholder="Password"
				value={form.password}
				onChange={handleChange}
			/>

			<button type="submit">Login</button>
		</form>
	);
}
