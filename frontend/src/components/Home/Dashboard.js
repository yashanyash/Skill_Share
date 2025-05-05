import React, { useState } from "react";
import { Link } from "react-router-dom";

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

function Dashboard() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Jane Cooper",
      role: "UX Designer at Design Co",
      time: "2h",
      content:
        "Just completed a new certification in UI/UX Design! Excited to share my latest project showcasing responsive design principles and accessibility features.",
      likes: 45,
      comments: 12,
      shares: 5,
      liked: false,
      image: "/api/placeholder/600/400",
    },
    {
      id: 2,
      author: "Alex Morgan",
      role: "Full Stack Developer",
      time: "1d",
      content:
        "Learning Tailwind CSS has been a game-changer for my development workflow. Here's a quick tip: utilize the @apply directive to extract repeated utility patterns into custom components!",
      likes: 89,
      comments: 24,
      shares: 15,
      liked: true,
      image: null,
    },
  ]);

  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      })
    );
  };

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
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-sm text-gray-500">Product Designer</p>
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
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow mb-6">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">
                          {post.author}
                        </h3>
                        <div className="text-gray-500 text-sm">
                        {post.time}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-800">{post.content}</p>
                    </div>
                    {post.image && (
                      <div className="mt-3">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-1/4">
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
                <ChatUi />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
