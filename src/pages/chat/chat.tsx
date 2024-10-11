// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import useSocket from './useSocket';

interface Message {
  id: string;
  text: string;
  user: string;
}

const Chat: React.FC = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, user: username };
      socket?.emit('message', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg shadow">
        <h2 className="text-2xl">Real-time Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow bg-white overflow-y-auto p-4 shadow-md rounded-b-lg">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong className="text-blue-600">{msg.user}</strong>: {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="bg-gray-100 p-4 flex">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
          className="mr-2 p-2 w-1/4 rounded border border-gray-300"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-grow p-2 rounded border border-gray-300"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
