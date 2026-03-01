import { Outlet } from "react-router";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./app.css";

function App() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;
