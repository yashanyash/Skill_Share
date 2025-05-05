import React from 'react'

function ChatUi() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
    <h4 className="font-semibold text-gray-900">Chat</h4>
    <div className="overflow-y-auto h-48 border border-gray-300 rounded-md p-2">
      {/* Chat messages would go here */}
      <div className="text-gray-700">User 1: Hello!</div>
      <div className="text-gray-700">User 2: Hi there!</div>
    </div>
    <input 
      type="text" 
      placeholder="Type a message..." 
      className="mt-2 w-full border border-gray-300 rounded-md p-2"
    />
  </div>
  )
}

export default ChatUi