import Cookies from 'js-cookie';

import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useEffect, useState } from "react";
// import { verifyToken } from "../utils/verifyToken";
// import { useAppDispatch } from "../redux/hooks";
// import { setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

const Login = () => {
  const navigate=useNavigate()
  const [login]=useLoginMutation()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  // const dispatch = useAppDispatch();
  const [authError,setAuthError]=useState("")

  const token= localStorage.getItem("token")
  const refreshToken=Cookies.get("refreshToken")
useEffect(()=>{

if(token||refreshToken){
  navigate("/")
}
},[token,refreshToken])

  const handleLogin=async(e:any)=>{
    e.preventDefault()
    try {
      const userInfo = {
         email,
        password
      }
      const res = await login(userInfo).unwrap();
      if(!res.success){
        setAuthError(res.message)
        return
      }
      // const user = verifyToken(res.data.accessToken)
      // dispatch(setUser({user:user,token:res.data.accessToken}))
      toast.success("Logged in",{id:email,duration:2000})
      localStorage.setItem("token",res.data.accessToken)
 } catch (err:any) {

  toast.error(err?.message,{id:email, duration:2000})
 }
  }
  return (
    <div>
      <div className="bg-gray-800  rounded-md p-10 w-full md:w-[400px] mx-auto h-[500px] m-10">
        <h5 className="text-3xl font-bold text-center font-mono my-5 bg-transparent">Login</h5>
        <form onSubmit={handleLogin} className="flex flex-col bg-transparent">
          <label htmlFor="" className="bg-transparent">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} className="bg-gray-500 p-2 px-3 rounded-full  border border-gray-800 text-white mt-2" type="email" name="" id="" placeholder="Enter Your Email" required />
          <label htmlFor="" className="mt-4 bg-transparent font-mono">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} className="bg-gray-500 p-2 px-3 rounded-full  border border-gray-800 text-black mt-2" type="password" name="" id="" placeholder="Enter Your Password" required />
         {authError&& <p className="text-red-500">{authError}</p> }
        <span className="underline bg-transparent mt-5 -mb-5 text-sm hover:cursor-pointer">Forget Password</span>
        <button type="submit" className="bg-primary text-white p-3 rounded-full mt-8"> Login</button>
        <p className="bg-transparent mt-8">Didn't have account? <Link to="/register" className="bg-transparent underline hover:text-primary ">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
