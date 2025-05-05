import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/postuploads");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleImgError = (postId, imgIndex) => {
    setImgErrors(prev => ({
      ...prev,
      [`${postId}-${imgIndex}`]: true
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">My Skills</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 text-center mb-6">
            Explore my collection of skills and projects showcased below. Each post represents a different area of expertise and experience.
          </p>
          
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{post.description}</h2>
              <p className="text-gray-500 text-sm mb-3">
                Uploaded on: {new Date(post.uploadDate).toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {post.photoPaths.map((path, index) => (
                !imgErrors[`${post.id}-${index}`] ? (
                  <img
                    key={index}
                    src={`http://localhost:8081${path}`}
                    alt={`Skill showcase ${index + 1}`}
                    className="w-full h-40 object-cover"
                    onError={() => handleImgError(post.id, index)}
                  />
                ) : (
                  <div key={index} className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image not available</span>
                  </div>
                )
              ))}
            </div>
          
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No skills posted yet.</p>
        </div>
      )}
    </div>
  );
};

export default SkillPostList;