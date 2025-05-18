import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';



function AppLayout() {
  
    return (
       <div className="flex flex-row min-h-screen max-w-screen">
            
            <div> 
                <Sidebar />
            </div>
            {/* Main content area that takes up remaining space */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
  }
  
  export default AppLayout