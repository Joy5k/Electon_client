// src/components/Chat.tsx

import { useEffect, useState } from 'react';
import useSocket from './useSocket';
import { verifyToken } from '../../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { IMessage } from '../../types';
import { useGetAllChattingRoomQuery } from '../../redux/features/chat/chattingManagement';

interface IUser {
  email: string;
}

const Chat = () => {
  const {data}=useGetAllChattingRoomQuery({})
  const navigate = useNavigate();
  const socket = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId,setUserId]=useState<string>("")
  const [role, setRole] = useState<'user' | 'super_admin'|'seller'>('user');
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
    const user = verifyToken(token) as { email: string;userId:string; role: 'user' | 'super_admin'|'seller' };
    setUserEmail(user?.email);
    setRole(user.role);
    setUserId(user.userId)

    if (!socket) return;

    const userRoom = role === 'user' ? user.email : currentRoom;

    // Join the room
    socket.emit('joinRoom', { email: user.email, room: userRoom ,role});

    // Fetch chat history for the room
    socket.emit('fetchHistory', { room: userRoom });

    // Listen for chat history
    socket.on('chatHistory', (history: IMessage[]) => {
        setMessages(history); // Set fetched messages to the state
    });

    // **NEW: Listen for incoming messages**
    socket.on('message', (newMessage: IMessage) => {
      setMessages((prev) => [...prev, newMessage]);
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
        id: userId,
        text: message,
        sender: userEmail,
        room: role === 'user' ? userEmail : currentRoom,
        user: '',
        role,
      };

      // Optimistically update the UI
      setMessages((prev) => {
        const isDuplicate = prev.some((msg) => msg.id === newMessage.id);
        if (isDuplicate) {
          return prev; // Return the existing state if duplicate
        }
        return [...prev, newMessage]; // Add the new message if it's not a duplicate
      });

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
      const users = data?.data.map((user: IMessage) => ({ email: user.room })) || [];
            setActiveUsers(users);
      setSelectedUser(users[0]?.email || ''); // Set the first user as selected by default
      setCurrentRoom(users[0]?.email || ''); // Set the first user's room by default
    }
  }, [data?.data, role]);

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
          {activeUsers.map((user, index) => (
            <div
              key={index}
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
        <div className="flex-grow bg-gray-800 p-4 overflow-y-auto" style={{ maxHeight: '350px' }}>
  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`flex mb-2 bg-transparent ${
        msg.sender === userEmail ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`p-2 max-w-xs break-words rounded-lg ${
          msg.sender === userEmail ? 'bg-blue-500 text-white' : 'bg-primary text-black'
        }`}
      >
        <p className="font-semibold mb-1 bg-transparent">
          {msg.sender === userEmail ? '' : msg.sender}
        </p>
        <p className='bg-transparent'>{msg.text}</p>
      </div>
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
