import { lazy , Suspense} from 'react';
import AppLayout from './components/layout/AppLayout'
import { Routes , Route } from 'react-router-dom';
import TodaysTasks from './pages/app/TodaysTasks';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CurrentTask from './pages/app/CurrentTask';
import Profile from './pages/profile/Profile';
const Landing = lazy(() => import('./pages/Landing'));
import NotFound from './pages/NotFound'
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';

function App() {
  return (

    <div>
      <Routes>
         {/* Public routes */}
         <Route path='/' element={<Suspense fallback={<Loader/>}><Landing /></Suspense>}/>

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
                <Route path='/profile' element={<Profile />} />
              </Route>
          </Route>

          {/* Catch-all route */}
          <Route path='*' element={<NotFound/>} />       

      </Routes>

      <Toaster/>
    </div>
  )
}

export default App