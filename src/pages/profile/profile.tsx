import { useState } from "react";



function Profile() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="mx-3">
        <div className="flex justify-center flex-col md:flex-row lg:flex-row">
            {/* image section */}
            <section className="">
        <div className=" flex flex-col justify-center items-center">
            <img className="rounded-lg w-36  " src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="" />
           
          <div className="flex justify-center flex-col md:flex-row lg:flex-row  w-full mt-10 ">
          <label className="mr-3 mb-1" htmlFor="" >First Name</label> 
            <input className=" border border-gray-500  rounded-md h-8 mr-2 bg-gray-900" type="text" name="firstName" id="" />

            <label className="mr-3  mb-1" htmlFor="">Last Name</label>
            <input className="border border-gray-500 rounded-md h-8 mr-2 bg-gray-900" type="text" name="lastName" id="" />

          </div>
           
           <div className="flex justify-center w-full flex-col">
           <div className=" mt-10">
      <label className=" mb-1 block" htmlFor="password">
        Password
      </label>

      <div className="relative">
        <input
          className="border border-gray-500 h-8 rounded-lg bg-gray-900 text-primary w-full pr-10 p-2 "
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Your password"
        />

        <button
          type="button"
          className="absolute right-2 top-2 text-sm text-white"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "Hide" : "See"}
        </button>
      </div>
    </div>

            <label className="mt-10" htmlFor="">Email</label>
            <input className="mt-1 border border-gray-500 h-8 rounded-lg bg-gray-900" type="email" name="password" id="" />
            <label className="mt-10" htmlFor="">Phone Number</label>
            <input className="mt-1 border border-gray-500 h-8 rounded-lg bg-gray-900" type="phoneNumber" name="password" id="" />
           </div>
    
        
        
        
        </div>
            </section>

            {/* description section */}
            <section >

            </section>
        </div>
    </div>
  )
}

export default Profile