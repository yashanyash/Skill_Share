import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddComment.css";

export default function AddComment() {
  let navigate = useNavigate();

  const [comment, setComment] = useState({
    commentId: "",
    commentName: "",
    commentCategory: "",
    commentDescription: "",
    commentDetails: ""
  });

  const { commentId, commentName, commentCategory, commentDescription, commentDetails } = comment;

  const onInputChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/comment", comment);
      console.log("Comment added successfully:", response.data);
      alert("Comment added successfully");
      navigate("/comments");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment: " + (error.response?.data || "No response from server. Is your backend running?"));
    }
  };

  return (
    <div className="add-comment-container">
      <div className="add-comment-header">
        <h1 className="add-comment-title">Add New Comment</h1>
      </div>
      
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="commentId" className="form-label">
              Comment ID
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter comment ID"
              name="commentId"
              value={commentId}
              onChange={onInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="commentName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter User name"
              name="commentName"
              value={commentName}
              onChange={onInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="commentCategory" className="form-label">
              Comment Category
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter comment category"
              name="commentCategory"
              value={commentCategory}
              onChange={onInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="commentDescription" className="form-label">
              Comment Description
            </label>
            <textarea
              className="form-control"
              placeholder="Enter comment description"
              name="commentDescription"
              value={commentDescription}
              onChange={onInputChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="commentDetails" className="form-label">
              Comment Details
            </label>
            <select
              className="form-control"
              name="commentDetails"
              value={commentDetails}
              onChange={onInputChange}
            >
              <option value="">Select a rating</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Normal">Normal</option>
              <option value="Poor">Poor</option>
              <option value="Very Poor">Very Poor</option>
            </select>
          </div>
          
          <div className="button-group">
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
            <Link className="btn btn-cancel" to="/comments">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

