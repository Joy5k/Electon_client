// src/components/Chat.tsx

import { useEffect, useState } from 'react';
import useSocket from './useSocket';
import { verifyToken } from '../../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { IMessage } from '../../types';

interface IUser {
  email: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [role, setRole] = useState<'user' | 'super_admin'>('user');
  const [activeUsers, setActiveUsers] = useState<IUser[]>([]); // Super admin active users
  const [currentRoom, setCurrentRoom] = useState<string>(''); // Super admin selected room
  const [selectedUser, setSelectedUser] = useState<string>(''); // Super admin selected user for chat
  // Handle user authentication and join room
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }

    const user = verifyToken(token) as { email: string; role: 'user' | 'super_admin' };
    setUserEmail(user?.email);
    setRole(user.role);

    if (!socket) return;

    const userRoom = role === 'user' ? user.email : currentRoom;

    // Join the room
    socket.emit('joinRoom', { email: user.email, room: userRoom });

    // Fetch chat history for the room
    socket.emit('fetchHistory', { room: userRoom });

    // Listen for chat history
    socket.on('chatHistory', (history: IMessage[]) => {
        setMessages(history); // Set fetched messages to the state
    });

    // Listen for incoming messages
    socket.on('message', (msg: IMessage) => {
        setMessages((prev) => [...prev, msg]);
    });

    return () => {
        socket.off('message');
        socket.off('chatHistory');
    };
}, [navigate, socket, role, currentRoom]);


  // Handle sending messages
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: IMessage = {
        id: Date.now().toString(),
        text: message,
        sender: userEmail,
        room: role === 'user' ? userEmail : currentRoom,
        user: '',
        role: ''
      };

      // Optimistically update the UI
      setMessages((prev) => [...prev, newMessage]);

      // Emit the message to the server
      socket?.emit('message', {
        room: role === 'user' ? userEmail : currentRoom,
        text: message,
        sender: userEmail ,
      });
      
      setMessage('');
    }
  };

  // Super admin: Mock active users list
  useEffect(() => {
    if (role === 'super_admin') {
      // Mock active users for demonstration
      const users = [{ email: 'user1@example.com' }, { email: 'user2@example.com' }];
      setActiveUsers(users);
      setSelectedUser(users[0]?.email || ''); // Set the first user as selected by default
      setCurrentRoom(users[0]?.email || ''); // Set the first user's room by default
    }
  }, [role]);

  // Handle switching between users (for super admin)
  const handleUserSelection = (userEmail: string) => {
    setSelectedUser(userEmail);
    setCurrentRoom(userEmail);
    socket!.emit('joinRoom', { email: userEmail, room: userEmail ,sender:userEmail}); // Join the selected user's room

    // Fetch chat history for the new room
    socket!.emit('fetchHistory', { room: userEmail });
    setMessages([]); // Clear messages temporarily (optional)
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {role === 'super_admin' && (
        <div className="w-1/4 bg-transparent border-r border-gray-300 p-4 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Active Users</h3>
          {activeUsers.map((user) => (
            <div
              key={user.email}
              onClick={() => handleUserSelection(user.email)}
              className={`p-2 mb-2 cursor-pointer rounded ${
                selectedUser === user.email ? 'bg-blue-500 text-white' : 'bg-gray-800'
              }`}
            >
              {user.email}
            </div>
          ))}
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col bg-transparent p-4 relative  border-dashed ">
        {/* Chat Header */}
        <div className="bg-primary text-white p-4 rounded-t-lg">
          <h2 className="text-3xl bg-transparent">
            {role === 'user' ? 'User Chat' : `Chat with ${selectedUser || 'Select a User'}`}
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow bg-gray-800">
          <div
            className="flex-grow bg-transparent overflow-y-auto p-4 rounded-b-lg right-0"
            style={{ maxHeight: '350px' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 w-fit p-2 rounded-full ${
                  msg.user === userEmail ? 'bg-blue-500 self-end' : 'bg-primary'
                }`}
              >
                <strong className="text-white mr-1 bg-transparent">{msg.user}</strong>:{' '}
                <span className="bg-transparent">{msg.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <div className="absolute bg-primary p-4 flex bottom-0 left-0 right-0">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-grow p-2 rounded border bg-yellow-100 border-gray-300 text-black"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 bg-black border border-gray-600 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
