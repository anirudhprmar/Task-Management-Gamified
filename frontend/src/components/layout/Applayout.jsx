import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';



function AppLayout() {
  
    return (
      <div className="p-2 ">
        <div className=''>
          <Sidebar/>
        </div>
          <Outlet />
      </div>
    )
  }
  
  export default AppLayout