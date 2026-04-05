import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getPostByIdAdmin, updatePost } from "../../api/posts.js";
import PostEditor from "../../components/PostEditor/PostEditor.jsx";
import styles from "./EditPost.module.css";

export default function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostByIdAdmin(postId);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  const handleUpdate = async (data) => {
    await updatePost(postId, data);
    navigate("/dashboard");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.editPostSection}>
      <div className={styles.editPostContainer}>
        <PostEditor initialData={post} onSubmit={handleUpdate} />
      </div>
    </section>
  );
}
