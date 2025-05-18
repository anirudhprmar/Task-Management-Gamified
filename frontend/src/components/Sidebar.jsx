import { Link, useLocation } from 'react-router-dom';
import { Home, Notebook, Menu, User, Clock, Calendar,X } from 'lucide-react';
// import { useCheckAuth } from '../hooks/useAuth';
import { useState } from 'react';

function Sidebar() {
  const location = useLocation();
  // const {data:checkAuth} = useCheckAuth()

  //  useEffect(()=>{
  //     checkAuth
  //   },[checkAuth])

  //gotta bring that profile image too 

    

  const navItems = [
    { icon: Home, label: 'My Day', path: '/myDay' },
    { icon: Clock, label: 'Ongoing Task', path: '/onGoing' },
    { icon: User , label: 'Profile', path: '/profile' },
  ];

  const [isOpen, setIsOpen] = useState(true)

  const handleToggle = ()=>{
    setIsOpen(!isOpen)
  }

  // want to show icons on closing sidebar -> not completely closed
  return (
    <div className={isOpen ? 'min-h-screen w-20 sm:w-80 px-3 py-3  ' : 'min-h-screen w-0  px-3 py-3 '} >

      {/* Navigation Section */}
      <nav className="">
        <ul className=" ">
          <li className='pb-5'>
             <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={handleToggle}
              className='cursor-pointer'
              >
                {isOpen ? <X /> : <Menu />}
              </button>
          </li>
          {isOpen &&   navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path} className={isOpen ? ' block py-2' :'hidden'}>
                <Link
                  to={item.path}
                  className={` flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary text-primary-content' 
                      : 'hover:bg-base-300'
                    }`}
                >
                  <Icon className="size-5 sm:size-5" />
                  <span className=' text-xl hidden sm:block'>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings Section (Bottom) */}
      {/* <div className="absolute right-0 sm:bottom-0 sm:w-full sm:p-4 sm:border-t sm:border-base-300">
        <Link 
          to="/settings" 
          className="sm:flex sm:items-center sm:gap-3 sm:px-4 sm:py-2 sm:rounded-lg sm:hover:bg-base-300 sm:transition-colors hidden "
        >
          <Settings className="size-5 sm:size-5" />
          <span className=' text-xl'>Settings</span>
        </Link>
      </div> */}
     
    </div>
  );
}

export default Sidebar;