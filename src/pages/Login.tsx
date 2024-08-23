
import { verifyToken } from "../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="bg-gray-800  rounded-md p-10 w-full md:w-[400px] mx-auto h-[500px] m-10">
        <h5 className="text-3xl font-bold text-center font-mono my-5 bg-transparent">Login</h5>
        <form className="flex flex-col bg-transparent">
          <label htmlFor="" className="bg-transparent">Email</label>
          <input className="bg-gray-500 p-2 px-3 rounded-full  border border-gray-800 text-white mt-2" type="email" name="" id="" placeholder="Enter Your Email" required />
          <label htmlFor="" className="mt-4 bg-transparent font-mono">Password</label>
          <input className="bg-gray-500 p-2 px-3 rounded-full  border border-gray-800 text-black mt-2" type="password" name="" id="" placeholder="Enter Your Password" required />
        <span className="underline bg-transparent mt-5 -mb-5 text-sm hover:cursor-pointer">Forget Password</span>
        <button className="bg-primary text-white p-3 rounded-full mt-8"> Login</button>
        <p className="bg-transparent mt-8">Didn't have account? <Link to="/register" className="bg-transparent underline hover:text-primary ">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
