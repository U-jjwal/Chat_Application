import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { getUsers, setSelectedUser } from "../store/slices/chatSlice"
import { Users } from "lucide-react";
import { Socket } from "socket.io-client";
import { getSocket } from "../lib/socket";
import { setNotification, clearNotification } from "../store/slices/authSlice";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const{ users, selectedUser, isUsersLoading } = useSelector(
    (state) => state.chat
  );

  const { onlineUsers , notifications } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    
    try {
      const savedNotifications = localStorage.getItem('chatNotifications');
      if (savedNotifications) {
        const notificationData = JSON.parse(savedNotifications);
        Object.keys(notificationData).forEach(userId => {
          if (notificationData[userId]) {
            dispatch(setNotification({ fromUserId: userId }));
          }
        });
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
  
    const handleNewMessage = (message) => {
      const senderId = message.senderId?.toString();
      const selectedUserId = selectedUser?._id?.toString();
  
      // If the chat with this user is NOT open, mark as unread
      if (senderId && senderId !== selectedUserId) {
        dispatch(setNotification({ fromUserId: senderId }));
      }
    };
  
    socket.on("newMessage", handleNewMessage);
  
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, selectedUser]);

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
    // Clear notification when user is selected
    if (notifications[user._id]) {
      dispatch(clearNotification({ fromUserId: user._id }));
    }
  };

  const filteredUsers = showOnlineOnly
   ? users?.filter((user) => onlineUsers.includes(user._id))
    : users;

    if(isUsersLoading) return <SidebarSkeleton/>;

  return (
    <>
      <aside  className={`h-full w-72 max-[900px]:w-full border border-white/10 backdrop-blur-md bg-transparent rounded-2xl shadow-lg flex flex-col transition-all duration-200
        ${selectedUser ? "max-[900px]:hidden" : ""}`}>
        {/* HEADER  */}
        <div className="border-b border-gray-500 2-full p-5 ">
          <div className="flex item-center gap-2">
            <Users className="w-6 h-6 text-gray-700" />
            <span className="font-bold  text-black bold">
              Contacts
            </span>
          </div>

          {/* ONLINE ONLY FILTER  */}
          <div className="mt-3  items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="w-4 h-4 border-gray-700 text-blue-00 focus:ring-blue-500"
              />
              Show Online Only
            </label>
            <span className="text-xs text-gray-500">
              ({onlineUsers.length - 2} online)
            </span>
          </div>
        </div>

        {/* USERS LIST  */}
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers?.length > 0 &&
            filteredUsers.map((user) => {
              return (
              <button
                key={user._id}
                onClick={() => handleUserClick(user)}
                className={`w-full p-3 flex item-center gap-3 transition-colors border border-gray-300 dark:border-gray-500 rounded-xl ${
                  selectedUser?._id === user._id
                    ? "bg-gray-600 ring-gray-200"
                    : "hover:bg-gray-200 dark:hover:bg-gray-900"
                }`}
              >
                {/* AVATAR  */}
                <div className="relative lg-mx-0">
                  <img
                    src={user?.avatar?.url || "/avatar-holder.avif"}
                    alt={"/avatar-holder.avif"}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                   {notifications[user._id] && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full ring-1 ring-white" />
                  )}
                </div>
                {/* USER INFO  */}
                <div className=" text-left min-w-0">
                  <div className="dark:text-white font-extrabold truncate">
                    {user.fullName}
                  </div>
                  <div className="text-sm text-gray-300 ">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>);
            })}

          {filteredUsers?.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No Online Users
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;