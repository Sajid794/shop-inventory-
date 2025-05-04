import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import baseUrl from "../../utils/baseurl";

export default function SignupPage() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmpassword,setConfirmPassword] = useState("");
  const[error,setError] = useState("");
  const[success,setSuccess]=useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");
    setSuccess("");

    if(password.length < 8){
      setError("password is more than 8 or equal to characters ")
      return;
    }

    if(password !==confirmpassword){
      setError("password and confirm password do not be same")
      return;
    } 
   
{/* Fetch API call to register the user */}

  const response = await fetch(`${baseUrl}/clientsignup`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();   
  console.log(data);
  if(data.status === false){
    setError(data.message);

  }else if(data.status === true){
    setSuccess(data.message);
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  }else{
    setError("Something went wrong! Please try again later.");
  }
  console.log(data);
  console.log("Error:", error);
  console.log("Success:", success);
  console.log("Email:", email);

  console.log("Password:", password);
  console.log("Confirm Password:", confirmpassword);
  console.log("Form submitted successfully!");  

     

  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?office,workspace')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-2xl shadow-2xl">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-green-600 mb-2">Client Sign Up</h2>
        <p className="text-center text-gray-600 mb-6">Create your new account below.</p>

        {/* Form */}
        <form onSubmit={handleSubmit}className="space-y-5">
          
          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <RiLockPasswordFill className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <RiLockPasswordFill className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              value={confirmpassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            
          >
            Sign Up
          </button>
        </form>
           {error && <p className="text-red-500 text-center">{error}</p>}
           {success && <p className="text-green-500 text-center">{success}</p>}
        {/* Login link */}
        <p className="text-center text-gray-600">
          Already have an account?
          <Link to="/loginPage" className="ml-1 text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
