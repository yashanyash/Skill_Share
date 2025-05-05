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
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Upload Date</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td className="py-2 px-4 border-b">{post.id}</td>
                            <td className="py-2 px-4 border-b">{post.description}</td>
                            <td className="py-2 px-4 border-b">{new Date(post.uploadDate).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkillPostTable;