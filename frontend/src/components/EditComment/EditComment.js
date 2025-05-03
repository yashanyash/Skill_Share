import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditComment() {
  let navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    loadComment();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/comment/${id}`, comment);
      navigate("/comments");
      alert("Comment updated successfully");
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment");
    }
  };

  const loadComment = async () => {
    try {
      const result = await axios.get(`http://localhost:8081/comment/${id}`);
      setComment(result.data);
    } catch (error) {
      console.error("Error loading comment:", error);
      alert("Failed to load comment data");
      navigate("/comments");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Comment</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
              <label htmlFor="commentName" className="form-label">
                Comment Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter comment name"
                name="commentName"
                value={commentName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
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
            <div className="mb-3">
              <label htmlFor="commentDescription" className="form-label">
                Comment Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter comment description"
                name="commentDescription"
                value={commentDescription}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="commentDetails" className="form-label">
                Comment Details
              </label>
              <textarea
                className="form-control"
                placeholder="Enter comment details"
                name="commentDetails"
                value={commentDetails}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/comments">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}