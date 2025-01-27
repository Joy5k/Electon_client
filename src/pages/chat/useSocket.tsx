import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = "https://electon-server-three.vercel.app" 


const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socketIo = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            withCredentials: true,
        });

        socketRef.current = socketIo;

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return socketRef.current;
};

export default useSocket;
