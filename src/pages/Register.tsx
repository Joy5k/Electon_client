import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [formValues, setFormValues] = useState({ gender: '' });

    const handleInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
        console.log(`Updated form values:`, formValues);
    };
    
    
    return (
        <div>
        <div className="bg-gray-800  rounded-md p-10 w-full md:w-[530px] mx-auto h-fit m-10">
          <h5 className="text-3xl font-bold text-center font-mono my-5 bg-transparent">Register</h5>
          <form className="flex flex-col bg-transparent">
            <div className="flex flex-col md:flex-row lg:flex-row justify-center bg-transparent my-4">
           <div  className="bg-transparent">
           <label htmlFor="" className="bg-transparent">First Name</label>
            <input onChange={(e)=>handleInputValues(e)} className="bg-gray-500 p-2 px-3 rounded-md  border border-gray-800 text-white mt-2" type="text" name="firstName" id="" placeholder="First Name" required />
           
           </div>
            <div className="bg-transparent">
            <label htmlFor="" className="bg-transparent">Last Name</label>
            <input onChange={(e)=>handleInputValues(e)} className="bg-gray-500 p-2 px-3 rounded-md  border border-gray-800 text-white mt-2" type="text" name="lastName" id="" placeholder="Last Name" required />
          
            </div>
            </div>
            <label htmlFor="" className="bg-transparent">Gender</label>
<div className="flex justify-start m-2 bg-transparent items-center align-middle gap-2">
  <input onChange={(e)=>handleInputValues(e)}
    className="bg-transparent p-2 px-3 rounded-full border border-gray-800 text-white mt-2"
    type="radio"
    name="gender"
    value="male"
    id="male"
  />
  <label htmlFor="male" className="text-white bg-transparent cursor-pointer">Male</label>

  <input onChange={(e)=>handleInputValues(e)}
    className="bg-transparent p-2 px-3 rounded-full border border-gray-800 text-white mt-2"
    type="radio"
    name="gender"
    value="female"
    id="female"
  />
  <label htmlFor="female" className="text-white bg-transparent cursor-pointer">Female</label>
</div>

<div className="flex flex-col md:flex-row lg:flex-row justify-center gap-5 bg-transparent my-3">
           <div  className="bg-transparent">
           <label htmlFor="" className="bg-transparent ">Address</label>
            <input onChange={(e)=>handleInputValues(e)} className="bg-gray-500 p-2 px-3 rounded-md  border border-gray-800 text-white mt-2" type="text" name="address" id="" placeholder="Dhaka,Bangladesh"  />
           
           </div>

            <div className="bg-transparent">
          
          
            <label htmlFor="" className="bg-transparent">Phone Number</label>
            <input onChange={(e)=>handleInputValues(e)} className="bg-gray-500 p-2 px-3 rounded-md  border border-gray-800 text-white mt-2" type="tel" name="phoneNumber" id="" placeholder="+8801601588531"  />
           
            </div>
            </div>
          
           
            <label htmlFor="" className="bg-transparent">Email</label>
            <input onChange={(e)=>handleInputValues(e)} className="bg-gray-500 p-2 px-3 rounded-md   border border-gray-800 text-white mt-2" type="email" name="email" id="" placeholder="Enter Your Email" required />
            <label htmlFor="" className="mt-4 bg-transparent font-mono">Password</label>
            <input onChange={(e)=>handleInputValues(e)} className="bg-gray-500 p-2 px-3 rounded-md   border border-gray-800 text-black mt-2" type="password" name="password" id="" placeholder="Enter Your Password" required />
          <button className="bg-primary hover:bg-yellow-600 text-white p-3 rounded-md mt-12"> Register</button>
          <p className="bg-transparent mt-8">Already have an account? <Link to="/login" className="bg-transparent underline hover:text-primary  ">Login</Link></p>
          </form>
        </div>
      </div>
    );
};

export default Register;