import { useRef, useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../../context/useAuth.js";
import {
  getPublicProfile,
  getCommentsByUser,
  deleteUser,
} from "../../api/users.js";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import styles from "./UserProfile.module.css";
import formatDateTime from "../../functions/formatDateTime.js";
import defaultAvatar from "../../icons/comment-account.svg";

export default function UserProfile() {
  const { userId } = useParams();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [userLoading, setUserLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const commentsHeaderRef = useRef(null);

  const scrollToCommentsHeader = () => {
    if (commentsHeaderRef.current) {
      commentsHeaderRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);

  // Get user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getPublicProfile(userId);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Get post comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentLoading(true);

        const data = await getCommentsByUser({ userId, page, limit: 10 });

        setComments(data.comments);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setCommentLoading(false);
      }
    };
    fetchComments();
  }, [userId, page]);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    await deleteUser(userId);
    navigate("/posts");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  if (userLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Post not found</p>;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const createdDate = formatDateTime(user.createdAt);

  return (
    <section className={styles.userProfileSection}>
      <div className={styles.profileContainer}>
        <img
          src={user.avatarUrl || defaultAvatar}
          alt="avatar"
          className={styles.avatar}
        />

        <div className={styles.profileContentContainer}>
          <h2>{user.username}</h2>

          <div className={styles.rowContainer}>
            <h3>First Name:</h3>
            <p>{user.firstname}</p>
          </div>

          <div className={styles.rowContainer}>
            <h3>Last Name:</h3>
            <p>{user.lastname}</p>
          </div>

          <div className={styles.rowContainer}>
            <h3>Account Created:</h3>
            <p>{createdDate}</p>
          </div>
        </div>
      </div>

      <div className={styles.commentsContainer}>
        <h2 ref={commentsHeaderRef} className={styles.commentHeader}>
          Comments {!commentLoading ? `(${totalCount})` : ""}
        </h2>

        {isAuthenticated ? (
          <>
            {commentLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {comments.map((comment) => {
                  const createdDate = formatDateTime(comment.createdAt);
                  const editedDate = formatDateTime(comment.updatedAt);

                  return (
                    <div key={comment.id} className={styles.commentContainer}>
                      <div className={styles.commentContentContainer}>
                        <div className={styles.postLinkContainer}>
                          <h4>Post:</h4>
                          <Link
                            to={`/posts/${comment.post.slug}`}
                            className={styles.postLink}
                          >
                            <p>{comment.post.title}</p>
                          </Link>
                        </div>

                        <p className={styles.commentContent}>
                          {comment.content}
                        </p>

                        <p className={styles.createdDate}>{createdDate}</p>

                        {comment.updatedAt !== comment.createdAt && (
                          <p className={styles.editedDate}>
                            Edited: {editedDate}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {totalPages > 1 && (
                  <div className={styles.pageContainer}>
                    {hasPrevious && (
                      <Link to={`/users/${userId}?page=${currentPage - 1}`}>
                        <button
                          className={styles.previousBtn}
                          onClick={() => {
                            scrollToCommentsHeader();
                            window.history.pushState(
                              null,
                              "",
                              `/users/${userId}?page=${currentPage - 1}`,
                            );
                          }}
                        >
                          Previous
                        </button>
                      </Link>
                    )}
                    <p>
                      Page {currentPage} of {totalPages}
                    </p>
                    {hasNext && (
                      <Link to={`/users/${userId}?page=${currentPage + 1}`}>
                        <button
                          className={styles.nextBtn}
                          onClick={() => {
                            scrollToCommentsHeader();
                            window.history.pushState(
                              null,
                              "",
                              `/users/${userId}?page=${currentPage + 1}`,
                            );
                          }}
                        >
                          Next
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <p>Login to see this user's comments</p>
        )}
      </div>

      {/* Admin delete user */}
      {isAdmin && (
        <button
          type="button"
          onClick={handleDelete}
          className={styles.deleteBtn}
        >
          Delete Account
        </button>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        message="Are you sure you want to delete this account?"
        confirmText="Delete Forever"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </section>
  );
}
