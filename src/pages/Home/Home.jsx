import { Link } from "react-router";
import styles from "./Home.module.css";

export default function Home() {
	return (
		<section className={styles.homeSection}>
			<div className={styles.homeHeader}>
				<h1>Welcome to my blog!</h1>
				<h2>A project in full stack web development</h2>
			</div>

			{/* Backend Section */}
			<div className={styles.backendHeader}>
				<h2>BACKEND</h2>
				<h3>Node.js</h3>
				<h3>REST API</h3>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<h3>Tech Stack</h3>
					<ul>
						<li>Node.js</li>
						<li>Express</li>
						<li>PostgreSQL</li>
						<li>Prisma ORM</li>
						<li>Passport Authentication</li>
						<li>JWT Authorization</li>
						<li>Jest + Supertest</li>
					</ul>
				</div>

				<div className={styles.filler}></div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.filler}></div>

				<div className={styles.content}>
					<h4>Authentication & Authorization</h4>
					<ul>
						<li>Secure login and registration using Passport</li>
						<li>JWT-based authentication for protected routes</li>
						<li>
							Authenticated users can create comments and manage their profile
						</li>
						<li>Public endpoints for reading posts and comments</li>
					</ul>
				</div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<h4>RESTful API Design</h4>
					<ul>
						<li>Resource-based endpoints for:</li>
						<ul>
							<li>Posts</li>
							<li>Comments</li>
							<li>Users</li>
							<li>Analytics</li>
						</ul>
						<li>Pagination support for posts and comments</li>
						<li>Consistent JSON response structure</li>
						<li>Error handling middleware for clean API responses</li>
					</ul>
				</div>

				<div className={styles.filler}></div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.filler}></div>

				<div className={styles.content}>
					<h4>Database Layer</h4>
					<ul>
						<li>PostgreSQL Relational Database</li>
						<li>Prisma ORM for:</li>
						<ul>
							<li>Type-safe database queries</li>
							<li>Schema migrations</li>
							<li>Relationship modeling between users, posts, and comments</li>
						</ul>
					</ul>
				</div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<h4>API Integration Testing</h4>
					<ul>
						<li>Written with Jest and Supertest</li>
						<li>Tests for:</li>
						<ul>
							<li>Authentication flows</li>
							<li>Protected routes</li>
							<li>Post and comment endpoints</li>
						</ul>
					</ul>
				</div>

				<div className={styles.filler}></div>
			</div>

			{/* Frontend Section */}
			<div className={styles.frontendHeader}>
				<h2>FRONTEND</h2>
				<h3>React Client</h3>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.filler}></div>

				<div className={styles.content}>
					<h3>Tech Stack</h3>
					<ul>
						<li>React</li>
						<li>Vite</li>
						<li>React Router</li>
						<li>Vitest</li>
						<li>CSS Modules</li>
					</ul>
				</div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<h4>Dynamic Post Feed</h4>
					<ul>
						<li>Paginated blog post list</li>
						<li>Content truncation with “Show More” navigation</li>
						<li>Client-side routing for individual post pages</li>
						<li>Comment count preview on each post</li>
					</ul>
				</div>

				<div className={styles.filler}></div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.filler}></div>

				<div className={styles.content}>
					<h4>Post Detail View</h4>
					<ul>
						<li>Full post display</li>
						<li>Author information and metadata</li>
						<li>Comment list with user avatars</li>
						<li>Pagination for large comment threads</li>
					</ul>
				</div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<h4>Comment System</h4>
					<ul>
						<li>Authenticated users can submit comments</li>
						<li>Inline comment editing for comment authors</li>
						<li>Comment deletion with confirmation modals</li>
						<li>Automatic UI updates after comment actions</li>
					</ul>
				</div>

				<div className={styles.filler}></div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.filler}></div>

				<div className={styles.content}>
					<h4>Admin Controls</h4>
					<ul>
						<li>Post publishing and unpublishing</li>
						<li>Post editing and deletion</li>
						<li>Inline comment moderation</li>
						<li>Protected admin interface for content management</li>
					</ul>
				</div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<h4>User Experience</h4>
					<ul>
						<li>Loading and error states for all API interactions</li>
						<li>Confirmation modals for destructive actions</li>
						<li>Date formatting utilities</li>
						<li>Content truncation utilities</li>
						<li>Default avatar fallbacks</li>
					</ul>
				</div>

				<div className={styles.filler}></div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.filler}></div>

				<div className={styles.content}>
					<h4>State Management</h4>
					<ul>
						<li>React hooks (useState, useEffect, useCallback)</li>
						<li>Context-based authentication (useAuth)</li>
						<li>Controlled form inputs for content creation and editing</li>
						<li>Pagination managed through URL query parameters</li>
					</ul>
				</div>
			</div>

			<Link to="/posts" className={styles.postsLink}>
				<button className={styles.postsBtn}>Go To Posts</button>
			</Link>
		</section>
	);
}
