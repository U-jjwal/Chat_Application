import React from 'react'
import { Video } from "lucide-react";

const RandomVideoCall = () => {

    const Call = (userId) => {
        alert("hey");
        console.log(userId)
    }
    
  return (
    <>
    
    <button
      onClick={() => {Call()}}
      className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
    >
     <Video size={35} strokeWidth={1.5} />
    
    </button>

    </>
  )
}

export default RandomVideoCall