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
      <Row justify="center" align="middle" style={{height:"100vh"}}> 
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <div>
        <PHInput type="text" name="id" label="ID:"></PHInput>
          </div>
      <div>
        <PHInput type="text" name="password" label="Password:"></PHInput>
      </div>
      <Button htmlType="submit">Login</Button>
    </PHForm>
  </Row>
  );
};

export default Login;
