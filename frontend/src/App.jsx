import { lazy } from 'react';
import AppLayout from './components/layout/AppLayout'
import {  , Route } from 'react-router-dom';
import TodaysTasks from './pages/app/TodaysTasks';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CurrentTask from './pages/app/CurrentTask';
import Profile from './pages/profile/Profile';
import Reflect from './pages/app/Reflect';
import WeeklyGoals from './pages/app/WeeklyGoals';
const Landing = lazy(() => import('./pages/Landing'));
import NotFound from './pages/NotFound'
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (

    <div>
      <Routes>
         {/* Public routes */}
         <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Landing /></Suspense>}/>

         {/* Auth routes */}
         <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
          </Route>

          {/* Protected routes */}

          <Route element={<ProtectedRoute />} >
              <Route element={<AppLayout/>} >
                <Route path='/myDay' element={<TodaysTasks />} />
                <Route path='/onGoing' element={<CurrentTask />} />
                <Route path='/reflect' element={<Reflect />} />
                <Route path='/weeklyGoals' element={<WeeklyGoals />} />
                <Route path='/profile' element={<Profile />} />
              </Route>
          </Route>

          {/* Catch-all route */}
          <Route path='*' element={<NotFound/>} />       

      </Routes>
    </div>
  )
}

export default App