import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const { selectedUser}  = useSelector((state) => state.chat);
  return <>
  <div className="min-h-screen bg-gray-100 dark:bg-[#132E35] dark:border-gray-700">
    <div className="flex items-center justify-center py-20 px-4" >
      <div className=" rounded-lg shadow-md w-full max-w-7xl h-[calc(100vh-8rem)] ">
        <div className="flex h-full rounded-lg overflow-hidden ">
          <Sidebar/>

          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}

        </div>
      </div>
    </div>
  </div>
  </>;
};

export default Home;
