import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DisplayComment.css";

export default function DisplayComment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/comment");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/comment/${id}`);
        loadComments();
        alert("Comment deleted successfully");
      } catch (error) {
        alert("Error deleting comment: " + error.message);
      }
    }
  };

  return (
    <div className="comments-container">
      <div className="comments-header">
        <h1 className="comments-title">All Comments</h1>
      </div>

      {loading ? (
        <div className="comments-loading">Loading comments...</div>
      ) : comments.length > 0 ? (
        <div className="comments-grid">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-description">{comment.commentDescription}</div>
              <div className="comment-details">
                <span><strong>ID:</strong> {comment.commentId}</span>
                <span><strong>Name:</strong> {comment.commentName}</span>
                <span><strong>Category:</strong> {comment.commentCategory}</span>
                <span><strong>Details:</strong> {comment.commentDetails}</span>
              </div>
              <div className="comment-actions">
                <Link
                  className="btn action-button btn-primary"
                  to={`/viewComment/${comment.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn action-button btn-secondary"
                  to={`/editComment/${comment.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn action-button btn-danger"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="comments-empty">No comments found. Add some comments to get started.</div>
      )}

      <div className="comments-actions">
        <Link to="/addComment" className="btn btn-primary">
          Add Comment
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}