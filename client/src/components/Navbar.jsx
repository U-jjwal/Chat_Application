import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import DarkModeToggle from "./DarkModeTonggle";
import VideoCall from "./RandomVideoCall";


const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());   
  };
  
  
  return <>
  
  <header className="fixed top-0 w-full z-40  backdrop-blur-md  bg-transparent  border-gray-400 shadow-lg shadow-[#139E35]/40">
  <div className="max-w-7xl mx-auto px-4 h-16">
    <div className="flex items-center justify-between h-full">
      {/*LEFT LOGO*/}
      <div className="flex items-center gap-8 ">
        <Link to={"/"} className="text-2xl font-bold flex items-center gap-2.5 hover:opacity-80 transition">
        

        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-500" />
        </div>

        <h1 className="text-lg font-bold text-black">Convo</h1>
        
        </Link>

     
      </div>
      
      {/*RIGHT NAVBAR*/}
      <div className="w-full flex justify-end" >
        <VideoCall/>
      </div>

      <div className="flex justify-end">
         <DarkModeToggle />
      </div>
      
      <div className="flex items-center gap-4">
        {
          authUser && (
            <>
            
            <Link to={"/profile"} className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
            <User className="w-6 h-6"/>
            <span className="hidden sm:inline">Profile</span>
            </Link> 



            <button 
            onClick={handleLogout} 
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm font-medium text-red-700 hover:bg-red-100 transition">
            <LogOut className="w-6 h-6"/>
            <span className="hidden sm:inline">Logout</span>
            </button> 
            
            </>
          )
        }
      </div>
      
    </div>
  </div>

  </header>
  
  </>;
};

export default Navbar;
