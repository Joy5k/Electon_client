// src/components/Chat.tsx
import  { useEffect, useState } from 'react';
import useSocket from './useSocket';
import { verifyToken } from '../../utils/verifyToken';
import { useNavigate } from 'react-router-dom';

// Make 'id' optional to accommodate incoming messages that already have an 'id'
interface Message {
  id?: string;
  text: string;
  user: string;
}

const Chat = () => {
  const navigate=useNavigate()
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  
 

  useEffect(() => {
    const token=localStorage.getItem("token")
    if(!token){
      localStorage.setItem('redirectPath', window.location.pathname);
      navigate('/login');
      return
    }
    const user=verifyToken(token) as {email:string}
    setUserEmail(user.email)
    if (!socket) return;

    // Listen for incoming messages
    socket.on('message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [navigate,socket]);

  const sendMessage = () => {
    if (message.trim()) {
      // Create a new message with a unique ID
      const newMessage: Message = {
        id: Date.now().toString(), // Simple unique ID
        text: message,
        user: userEmail,
      };

      // Add the message to the local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the message to the server
      socket?.emit('message', newMessage);

      // Clear the message input
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white p-4  relative">
      {/* Chat Header */}
      <div className="bg-primary text-white p-4 rounded-t-lg ">
        <h2 className="text-3xl bg-transparent">Messenger</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow bg-transparent">
  <div className="flex-grow bg-white overflow-y-auto p-4  rounded-b-lg right-0" style={{ maxHeight: '350px' }}>
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`mb-2 w-fit p-2 rounded-full ${
          msg.user === userEmail ? 'bg-blue-500 self-end' : 'bg-primary'
        }`}
      >
        <strong className="text-white mr-1 bg-transparent">{msg.user}</strong>: <span className='bg-transparent'>{msg.text}</span>
      </div>
    ))}
  </div>
</div>

      

      {/* Input Field */}
      <div className= "absolute bg-primary p-4 flex  bottom-0 left-0 right-0 ">
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
  );
};

export default Chat;
