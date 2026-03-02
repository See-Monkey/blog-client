import styles from "./Footer.module.css";
import githubLogo from "../../icons/github.svg";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<h4 className={styles.createdBy}>Created by See-Monkey</h4>
				<div className={styles.githubContainer}>
					<img src={githubLogo} alt="Github" className={styles.githubLogo} />
					<div className={styles.linkContainer}>
						<a href="https://github.com/See-Monkey/blog-api">
							Backend Express API
						</a>
						<a href="https://github.com/See-Monkey/blog-client">
							Frontend React App
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
