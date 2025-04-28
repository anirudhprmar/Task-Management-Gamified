import { Outlet } from 'react-router-dom';


function AppLayout() {
  
    return (
      <div className="p-3">
          <Outlet />
      </div>
    )
  }
  
  export default AppLayout