import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SkillPostTable = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/postuploads"); // Adjust the URL as needed
                setPosts(response.data);
            } catch (err) {
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8081/api/postuploads/${id}`); // Adjust the URL as needed
                setPosts(posts.filter(post => post.id !== id));
                Swal.fire("Deleted!", "Your post has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error!", "There was an error deleting the post.", "error");
            }
        }
    };

    const handleEdit = (post) => {
        // Implement the edit functionality here
        // You can redirect to an edit form or open a modal with the post data
        console.log("Edit post:", post);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">Uploaded Posts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Upload Date</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-gray-100 transition duration-200"
                    >
                      <td className="px-6 py-4 font-medium">{post.id}</td>
                      <td className="px-6 py-4">{post.description}</td>
                      <td className="px-6 py-4">
                        {new Date(post.uploadDate).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
};

export default SkillPostTable;