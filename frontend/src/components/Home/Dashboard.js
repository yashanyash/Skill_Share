import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  Search,
  Bell,
  User,
  Briefcase,
  BookOpen,
  Users,
  Menu,
  X,
  Home,
} from "lucide-react";
import ChatUi from "./ChatUi";
import Button from "./Button";
import Navbar from "./Navbar";
import ChatRoom from "../ChatRoom";

function Dashboard() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/postuploads"
        );
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      <Navbar />

      {/* Main Content Area with Left Sidebar */}
      <main className="pt-20 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Profile Summary */}
            <div className="hidden lg:block w-1/5">
              <div className="bg-white rounded-lg shadow mb-4">
                <div className="h-16 bg-blue-700 rounded-t-lg"></div>
                <div className="px-4 pb-4">
                  <div className="flex justify-center -mt-8">
                    <div className="w-16 h-16 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center">
                      <User size={32} />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="font-semibold text-lg">Himaya</h3>
                    <p className="text-sm text-gray-500">Web developer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Section */}
            <div className="w-full lg:w-1/2">
              {/* Create Post */}
              <div className="bg-white rounded-lg shadow mb-6 p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <div className="ml-3 flex-grow">
                    <Link to="/skillform">
                      <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500">
                        Start a post
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Posts */}
              {loading ? (
                <div className="text-center py-6">Loading posts...</div>
              ) : error ? (
                <div className="text-center text-red-600">{error}</div>
              ) : posts.length === 0 ? (
                <div className="text-center text-gray-500 py-6">
                  No skills posted yet.
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow mb-6"
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                          <User size={20} />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-900">
                            Skill Post
                          </h3>
                          <div className="text-gray-500 text-sm">
                            {new Date(post.uploadDate).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-800">{post.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1 mt-3">
                        {post.photoPaths.map((path, index) =>
                          !imgErrors[`${post.id}-${index}`] ? (
                            <img
                            src={`http://localhost:8081${path}`} // path is like /uploads/filename.jpg
                            alt={`Skill image ${index + 1}`}
                            className="w-full h-40 object-cover"
                           
                          />
                          
                          ) : (
                            <div
                              key={index}
                              className="w-full h-40 bg-gray-200 flex items-center justify-center"
                            >
                              <span className="text-gray-500 text-sm">
                                Image not available
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h4 className="font-medium text-lg mb-3">Add to your feed</h4>
                <div className="space-y-4">
                  <Button
                    label="Follow Companies"
                    onClick={() => alert("Follow Companies clicked")}
                  />
                  <Button
                    label="Connect with People"
                    onClick={() => alert("Connect with People clicked")}
                  />
                  <Button
                    label="Discover Groups"
                    onClick={() => alert("Discover Groups clicked")}
                  />
                  <Button
                    label="Find Events"
                    onClick={() => alert("Find Events clicked")}
                  />
                </div>
              </div>

              <div className="sticky top-20">
                <ChatRoom/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
