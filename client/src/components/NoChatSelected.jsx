import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return(
  <>
    <div className="w-full hidden min-[900px]:flex flex-1 flex-col  items-center justify-center p-16 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg">
      <div className="max-w-md text-center space-y-6">
        {/* ICON DISPLAY  */}
        <div className="flex justify-center gap-4 mb-4">
         <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-blue-600"/>
           </div>
          </div>
       </div>

    {/* welcome Text  */}

    <h2 className="text-2xl font-bold text-grap-800">
      Welcome to Convo!
    </h2>
    <p className="text-gray-500">
      Select a conversion from the sidebar to start chatting
    </p>
       
     </div>
   </div> 
  </>
  );
};

export default NoChatSelected;
