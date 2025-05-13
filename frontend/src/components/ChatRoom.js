import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
  });
  const [messageInput, setMessageInput] = useState("");
  const [editingMessage, setEditingMessage] = useState({
    chatIndex: null,
    username: "",
    value: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    const Sock = new SockJS("http://localhost:8081/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData((prev) => ({ ...prev, connected: true }));
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessage
    );
    userJoin();
  };

  const onError = (err) => {
    console.error("Connection error:", err);
  };

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.has(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        setPublicChats((prev) => [...prev, payloadData]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    if (privateChats.has(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      const newList = [payloadData];
      privateChats.set(payloadData.senderName, newList);
      setPrivateChats(new Map(privateChats));
    }
  };

  const handleUsername = (e) => {
    const { value } = e.target;
    setUserData({ ...userData, username: value });
  };

  const handleMessage = (e) => {
    setMessageInput(e.target.value);
  };

  const sendValue = () => {
    if (stompClient && messageInput.trim()) {
      const chatMessage = {
        senderName: userData.username,
        message: messageInput,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setMessageInput("");
    }
  };

  const sendPrivateValue = () => {
    if (stompClient && messageInput.trim()) {
      const chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: messageInput,
        status: "MESSAGE",
      };
      if (userData.username !== tab) {
        if (privateChats.has(tab)) {
          privateChats.get(tab).push(chatMessage);
        } else {
          privateChats.set(tab, [chatMessage]);
        }
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setMessageInput("");
    }
  };

  const registerUser = () => {
    if (userData.username.trim()) {
      connect();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {userData.connected ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-100 border-r border-gray-200">
              <ul className="divide-y divide-gray-200">
                <li
                  onClick={() => setTab("CHATROOM")}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-200 ${
                    tab === "CHATROOM" ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  Chatroom
                </li>
                {[...privateChats.keys()].map((name, index) => (
                  <li
                    key={index}
                    onClick={() => setTab(name)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-200 ${
                      tab === name ? "bg-blue-100 font-medium" : ""
                    }`}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat Content */}
            <div className="w-3/4 flex flex-col h-96">
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-3">
                  {(tab === "CHATROOM"
                    ? publicChats
                    : privateChats.get(tab) || []
                  ).map((chat, index) => (
                    <li
                    key={index}
                    className={`flex ${
                      chat.senderName === userData.username ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium mr-2">
                        {chat.senderName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="relative group max-w-xs">
                      {editingMessage.chatIndex === index && editingMessage.username === chat.senderName ? (
                        <div className="flex items-center">
                          <input
                            value={editingMessage.value}
                            onChange={(e) =>
                              setEditingMessage((prev) => ({ ...prev, value: e.target.value }))
                            }
                            className="border border-gray-300 rounded px-2 py-1 mr-2"
                          />
                          <button
                            onClick={() => {
                              const updatedChats = [...(privateChats.get(tab) || [])];
                              updatedChats[index].message = editingMessage.value;
                              privateChats.set(tab, updatedChats);
                              setPrivateChats(new Map(privateChats));
                              setEditingMessage({ chatIndex: null, username: '', value: '' });
                            }}
                            className="text-sm text-blue-500 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={() =>
                              setEditingMessage({ chatIndex: null, username: '', value: '' })
                            }
                            className="text-sm text-red-500 ml-2 hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div
                            className={`rounded-lg px-3 py-2 ${
                              chat.senderName === userData.username
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100'
                            }`}
                          >
                            {chat.message}
                          </div>
                          {tab !== 'CHATROOM' &&
                            chat.senderName === userData.username && (
                              <div className="absolute right-0 top-0 hidden group-hover:flex space-x-1 bg-white p-1 rounded shadow-md z-10">
                                <button
                                  className="text-xs text-blue-500 hover:underline"
                                  onClick={() =>
                                    setEditingMessage({
                                      chatIndex: index,
                                      username: chat.senderName,
                                      value: chat.message,
                                    })
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-xs text-red-500 hover:underline"
                                  onClick={() => {
                                    const updatedChats = [...(privateChats.get(tab) || [])];
                                    updatedChats.splice(index, 1);
                                    privateChats.set(tab, updatedChats);
                                    setPrivateChats(new Map(privateChats));
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                      {chat.senderName === userData.username && (
                        <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium text-white ml-2">
                          {chat.senderName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-200 p-3 flex">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message"
                  value={messageInput}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
                  onClick={tab === "CHATROOM" ? sendValue : sendPrivateValue}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Join Chat
          </h2>
          <input
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={userData.username}
            onChange={handleUsername}
          />
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={registerUser}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
