import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { useCheckAuth } from '../../hooks/useAuth';

function ProtectedRoute() {
    
    const {data:checkAuth,isLoading,error} = useCheckAuth()
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
              <LoaderCircle className="size-10 animate-spin" />
            </div>
          );
    }

    if (!checkAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (error) return <p>Something went wrong: {error.message}</p>;
    
    return <Outlet />
}

export default ProtectedRoute
