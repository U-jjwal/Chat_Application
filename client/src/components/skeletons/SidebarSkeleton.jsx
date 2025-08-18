import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);
  return <>
  {/* HELDER  */}
  <aside className="h-full max-[900px]:w-full w-72 border-r border-gray-200 flex flex-col transition-all diration-200">
    <div className="border-b border-gray-200 2-full p-5 ">
          <div className="flex item-center gap-2">
            <Users className="w-6 h-6 text-gray-700" />
            <span className="font-medium hidden lg:block text-gray-800">
              Contacts
            </span>
          </div>
    </div>

  {/* SKELETION CONTACTS  */}
  <div className="overflow-y-auto w-full py-3">
    {
      skeletonContacts.map((_, index) => {
        return (
          <div key={index} className="w-full p-3 flex item-center gpa-3 animate-pulse">
            {/* Avatar Skeleton  */}
            <div className="relative  lg:mx-0">
              <div className="w-12 h-12 bg-gray-300 rounded-full"/>
            </div>


          {/* TEXT SKELETON FOR LARGE SCREEN ONLY  */}

          <div className="hidden lg:flex flex:col gap-2 flex-1">
            <div className="h-4 w-32 bg-gray-300 rounded"/>
            <div className="h-4 w-32 bg-gray-300 rounded"/>
            <div className="h-4 w-32 bg-gray-300 rounded"/>
          </div>
            
          </div>
        )
      })
    }
  </div>

    
  </aside>
  </>;
};

export default SidebarSkeleton;
