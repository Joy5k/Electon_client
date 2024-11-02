import { useState } from "react";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    facebook: "",
    instagram: "",
    twitter: "",
    aboutMe: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="mx-3">
      <div className="flex justify-center flex-col md:flex-row lg:flex-row md:p-4 lg:p-6">
        
        {/* Image and Basic Info Section */}
        <section className="border p-4">
          <div className="flex flex-col justify-center items-center">
            <img
              className="rounded-lg w-36"
              src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
              alt="Profile Picture"
            />
            <input className="p-2 bg-blue-950 cursor-pointer" type="file" name="image" id="" placeholder="Upload Image" />
            <div className="flex justify-center flex-col w-full mt-10">
              <label htmlFor="firstName" className="mr-3 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border border-gray-500 rounded-md h-8 mr-2 bg-gray-900"
              />
              <label htmlFor="lastName" className="mr-3 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border border-gray-500 rounded-md h-8 mr-2 bg-gray-900"
              />
            </div>

            {/* Password Field */}
            <div className="flex justify-center w-full flex-col mt-10">
              <label htmlFor="password" className="mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your password"
                  className="border border-gray-500 h-8 rounded-lg bg-gray-900  w-full pr-10 p-2"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-white"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "See"}
                </button>
              </div>

              {/* Email and Phone Number */}
              <label htmlFor="email" className="mt-10">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 border border-gray-500 h-8 rounded-lg bg-gray-900"
              />
              <label htmlFor="phoneNumber" className="mt-10">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 border border-gray-500 h-8 rounded-lg bg-gray-900"
              />
            </div>
          </div>
        </section>

        {/* Social Media and About Me Section */}
        <section className="border p-4">
          <div>
            <label htmlFor="facebook" className="mt-10">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 border border-gray-500 h-8 rounded-lg bg-gray-900"
            />
            <label htmlFor="instagram" className="mt-10">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 border border-gray-500 h-8 rounded-lg bg-gray-900"
            />
            <label htmlFor="twitter" className="mt-10">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 border border-gray-500 h-8 rounded-lg bg-gray-900"
            />
            <label htmlFor="aboutMe" className="mt-10">About me</label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-4 border border-gray-500 h-full w-full p-2 rounded-lg bg-gray-900"
            />
          </div>
        </section>
      </div>

      {/* Edit and Save Buttons */}
      <div className="flex justify-center mt-4">
        <button
          onClick={toggleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
