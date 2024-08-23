import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

 
  const [login] = useLoginMutation();
  const defaultValues = {
    id: "A-0001",
    password:"admin123"
  }
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
        const toastId=toast.loading("Logging in",{duration:2000})
        try {
            const userInfo = {
                id: data.id,
                password: data.password
            }
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken)as TUser
            dispatch(setUser({ user: user, token: res.data.accessToken }))
            toast.success("Logged in",{id:toastId,duration:2000})
        navigate(`/${user.role}/dashboard`)
       } catch (err) {
        toast.error("Something went wrong",{id:toastId, duration:2000})
       }
  };
  return (
    <div>
      <div className="bg-gray-400 p-10 w-full md:w-[400px] mx-auto h-[400px]">
        <h5 className="text-3xl font-bold text-center font-mono my-5 bg-transparent">Login</h5>
        <form className="flex flex-col bg-transparent">
          <label htmlFor="" className="bg-transparent">Email</label>
          <input className="bg-gray-500 p-2 rounded-full  border border-gray-800 text-white mt-2" type="email" name="" id="" placeholder="Enter Your Email" required />
          <label htmlFor="" className="mt-4 bg-transparent font-mono">Password</label>
          <input className="bg-gray-500 p-2 rounded-full  border border-gray-800 text-black mt-2" type="password" name="" id="" placeholder="Enter Your Password" required />
        <button className="bg-primary text-white p-3 rounded-full mt-8"> Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
