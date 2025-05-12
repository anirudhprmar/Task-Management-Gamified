import { useCheckAuth } from '../../hooks/useAuth';
import { Outlet, useLocation, Navigate } from 'react-router-dom'; 
import Loader from '../Loader';
import { useEffect } from 'react';

function AuthLayout() {
  const { data: checkAuth, isLoading, error } = useCheckAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/myDay";

  useEffect(()=>{
    checkAuth
  },[checkAuth])

  if (isLoading) {
    return (
    <Loader/>
    );
  }

  if (error) {
    console.log("error in authlayout",error);
  }

  

  if (checkAuth) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

export default AuthLayout;