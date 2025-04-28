import { useCheckAuth } from '../../hooks/useAuth';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

function AuthLayout() {

const {data:checkAuth,isLoading,error } = useCheckAuth()

const location = useLocation();

const from = location.state?.from?.pathname || "/myDay";

if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <LoaderCircle className="size-10 animate-spin" />
        </div>
      );
}

if (checkAuth) {
    return <Navigate to={from} replace />
}

if (error) return <p>Something went wrong: {error.message}</p>;

  return <Outlet/>
}

export default AuthLayout
