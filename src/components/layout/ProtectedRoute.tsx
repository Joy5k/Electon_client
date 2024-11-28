import  { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);
    const authToken=localStorage.getItem("token")
    if (!token||!authToken) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    return children
    
};

export default ProtectedRoute;