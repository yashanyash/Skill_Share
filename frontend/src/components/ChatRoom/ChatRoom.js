import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
    
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const {value} = event.target;
        setUserData({...userData, "message": value});
    }
    
    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData, "message": ""});
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };
            
            if(userData.username !== tab){
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData, "message": ""});
        }
    }

    const handleUsername = (event) => {
        const {value} = event.target;
        setUserData({...userData, "username": value});
    }

    const registerUser = () => {
        connect();
    }
    
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            {userData.connected ?
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="flex h-full">
                        {/* Member List */}
                        <div className="w-1/4 bg-gray-100 border-r border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                <li 
                                    onClick={() => {setTab("CHATROOM")}} 
                                    className={`px-4 py-3 cursor-pointer hover:bg-gray-200 ${tab === "CHATROOM" ? "bg-blue-100 font-medium" : ""}`}
                                >
                                    Chatroom
                                </li>
                                {[...privateChats.keys()].map((name, index) => (
                                    <li 
                                        onClick={() => {setTab(name)}} 
                                        className={`px-4 py-3 cursor-pointer hover:bg-gray-200 ${tab === name ? "bg-blue-100 font-medium" : ""}`} 
                                        key={index}
                                    >
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Chat Content */}
                        <div className="w-3/4 flex flex-col h-96">
                            {tab === "CHATROOM" && (
                                <div className="flex flex-col h-full">
                                    <div className="flex-1 overflow-y-auto p-4">
                                        <ul className="space-y-3">
                                            {publicChats.map((chat, index) => (
                                                <li className={`flex ${chat.senderName === userData.username ? "justify-end" : "justify-start"}`} key={index}>
                                                    {chat.senderName !== userData.username && 
                                                        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium mr-2">
                                                            {chat.senderName.charAt(0).toUpperCase()}
                                                        </div>
                                                    }
                                                    <div className={`rounded-lg px-3 py-2 max-w-xs ${chat.senderName === userData.username ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                                                        {chat.message}
                                                    </div>
                                                    {chat.senderName === userData.username && 
                                                        <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium text-white ml-2">
                                                            {chat.senderName.charAt(0).toUpperCase()}
                                                        </div>
                                                    }
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="border-t border-gray-200 p-3 flex">
                                        <input 
                                            type="text" 
                                            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            placeholder="Enter your message" 
                                            value={userData.message} 
                                            onChange={handleMessage} 
                                        /> 
                                        <button 
                                            type="button" 
                                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition" 
                                            onClick={sendValue}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {tab !== "CHATROOM" && (
                                <div className="flex flex-col h-full">
                                    <div className="flex-1 overflow-y-auto p-4">
                                        <ul className="space-y-3">
                                            {privateChats.get(tab) && [...privateChats.get(tab)].map((chat, index) => (
                                                <li className={`flex ${chat.senderName === userData.username ? "justify-end" : "justify-start"}`} key={index}>
                                                    {chat.senderName !== userData.username && 
                                                        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium mr-2">
                                                            {chat.senderName.charAt(0).toUpperCase()}
                                                        </div>
                                                    }
                                                    <div className={`rounded-lg px-3 py-2 max-w-xs ${chat.senderName === userData.username ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                                                        {chat.message}
                                                    </div>
                                                    {chat.senderName === userData.username && 
                                                        <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium text-white ml-2">
                                                            {chat.senderName.charAt(0).toUpperCase()}
                                                        </div>
                                                    }
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="border-t border-gray-200 p-3 flex">
                                        <input 
                                            type="text" 
                                            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            placeholder="Enter your message" 
                                            value={userData.message} 
                                            onChange={handleMessage} 
                                        /> 
                                        <button 
                                            type="button" 
                                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition" 
                                            onClick={sendPrivateValue}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                :
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Join Chat</h2>
                    <input
                        id="user-name"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        name="userName"
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
            }
        </div>
    )
}

export default ChatRoom