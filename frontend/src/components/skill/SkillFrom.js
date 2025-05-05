import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../Home/Navbar";

function SkillUploadForm() {
  const [formData, setFormData] = useState({
    description: "",
    files: [], // To hold multiple files
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      setFormData({ ...formData, files: Array.from(files) }); // Store multiple files
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if files are selected
    if (formData.files.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No files selected",
        text: "Please upload at least one file before submitting.",
      });
      return;
    }

    // Proceed with form submission
    const data = new FormData();
    data.append("description", formData.description);

    // Append each file to the FormData under the key "files"
    formData.files.forEach((file) => {
      data.append("files", file); // Append each file to files
    });

    try {
      const response = await axios.post(
        "http://localhost:8081/api/postuploads/upload", // Adjust the URL as needed
        data
      );

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: response.data || "Your post has been uploaded!",
      });

      // Optionally reset formData here
      setFormData({
        description: "",
        files: [],
      });
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong. Please check the console for more details.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
        style={{marginTop:"100px"}}
      >
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          name="files"
          accept="image/*" // Accept multiple image files
          onChange={handleChange}
          multiple // Allow multiple file uploads
          required
          className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Upload Post
        </button>
      </form>
    </div>
  );
}

export default SkillUploadForm;
