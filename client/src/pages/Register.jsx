import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthImagePattern from "../components/AuthImagePattern";
import { signup } from "../store/slices/authSlice";
import { Link } from "react-router-dom";


const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { isSigningUp } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };
  
  return <>

  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
    <div className="flex flex-col justify-center items-center px-6 py-12">
    <div className="w-full max-w-md" >
        {/* LOGO & HEADING  */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-blue-100 p-3 rounded-lg" >
          <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold mt-4">Create Your Account</h1> 
          <p className="text-gray-600 text-sm mt-2">Get started with your free account</p>
      </div>

        {/* REGISTER FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-5 h-5" />
              </span>
              <input
               type="text"
               className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Your Name" 
               value={formData.fullName} 
              onChange={
                (e) => setFormData({...formData, fullName: e.target.value})} 
               />
            
          </div>
        </div>

          
          
          
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-5 h-5" />
              </span>
              <input
               type="email"
               className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Enter your email" 
               value={formData.email} 
              onChange={
                (e) => setFormData({...formData, email: e.target.value})} 
               />
            
          </div>
        </div>





        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-5 h-5" />
              </span>
              <input
               type={showPassword ? "text" :"password"}
               className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="**********" 
               value={formData.password} 
              onChange={
                (e) => setFormData({...formData, password: e.target.value})} 
               />
            <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
             >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" /> 
              )}
             </button>
          </div>
        </div>
        
    {/* Submit button  */}

    <button
     type="submit"
     disabled={isSigningUp}
      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
     >
      {isSigningUp ? (
        <>
        <Loader2 className="animate-spin w-5 h-5" /> Loading...
        </>
      ) : (
        "Create Account"
      )}
     </button>
      </form>


        {/* FOOTER  */}

        <div className="mt-6 text-sm text-gray-600">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Sign In 
          </Link>
        </p>
        </div>




      </div>
    </div>


     {/* RIGHT SIDE - PAATTERN  */}

     <AuthImagePattern
  title="Join our community!"
  subtitle="Connect with friends and family, share your thoughts, and stay in touch with your loved ones."
      />


  </div>

  
  </>;
};

export default Register;
