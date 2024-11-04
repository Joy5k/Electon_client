import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios';
import { ImgBBResponseData } from "../../types";
import { useGetUserQuery, useUpdateUserMutation } from "../../redux/features/userManagement/userManagement";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploadLoading] = useState<boolean>(false);
  const [file,setFile]=useState<File | undefined>(undefined);
  const [userUpdate,{isLoading:updatingUserInfo}]=useUpdateUserMutation()

  const {data:userData}=useGetUserQuery({})

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    image:"",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    facebook: "",
    instagram: "",
    twitter: "",
    aboutMe: "Describe yourself...",
  });
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.data?.firstName || "",
        lastName: userData.data?.lastName || "",
        image: userData.data?.image || "",
        email: userData.data?.email || "",
        phoneNumber: userData.data?.phoneNumber || "",
        facebook: userData.data?.facebook || "",
        instagram: userData.data?.instagram || "",
        twitter: userData.data?.twitter || "",
        aboutMe: userData.data?.aboutMe || "Describe yourself...",
        password: "", // Set password to an empty string or provide any default you need
      });
    }
  }, [userData]);
  


  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 // Handle image upload and preview
 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImagePreview(URL.createObjectURL(file));
    setFile(file)
  }
};

//Handle Image upload for user profile
const handleSaveImage = async () => {
  if (!file) return;

  setImageUploadLoading(true);
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post<ImgBBResponseData>(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`, 
      formData, 
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.data && response.data.data && response.data.data.url) {
      const uploadedImageUrl = response.data.data.url;
      setImagePreview(uploadedImageUrl); // Clear image preview after saving
      toast.success('Image Uploaded successfully');
      setImageUploadLoading(false);
      
      // Update the formData with the new image URL to trigger a re-render
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: uploadedImageUrl
      }));

      // Updating the image URL in the database
      await userUpdate({ image: uploadedImageUrl });
    } else {
      console.log("Failed to upload image. Please try again.");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  } finally {
    setImageUploadLoading(false);
  }
};
//handle the user profile update 
const handleUserProfileUpdate = async () => {
  try {
     const response = await userUpdate(formData).unwrap(); // `unwrap()` handles response directly from RTK Query
     toast.success("Profile updated successfully!");
     console.log(response);
     setIsEditing(false);
  } catch (error) {
     toast.error("Update failed. Please try again.");
     console.error("Error updating profile:", error);
  }
};


  return (
   <div>
    {
      updatingUserInfo ? <p className="text-primary text-2xl font-bold mt-10 font-sans text-center mx-auto">Updating User  info..</p>:  <div className="mx-3">
      <div className="flex justify-center flex-col md:flex-row lg:flex-row md:p-4 lg:p-6">
        
        {/* Image and Basic Info Section */}
        <section className="border p-4">
  <div className="flex flex-col justify-center items-center">
    <img
      className="rounded-lg max-w-full w-52 h-36"
      src={imagePreview|| userData?.data?.image}
      alt="Profile Picture"
    />

    {/* Hidden Image Upload Input */}
    <input
      id="imageUpload"
      type="file"
      name="image"
      onChange={(e) => handleImageUpload(e)}
      className="hidden"
    />

    {/* Custom Label Button for Image Upload */}
    <label
      htmlFor="imageUpload"
      className="p-2 bg-blue-950 text-white rounded-lg cursor-pointer mt-2 w-full max-w-xs text-center"
    >
      Change your picture
    </label>

    {/* Save Image Button */}
    {imagePreview && (
      <button
        onClick={handleSaveImage}
        className="bg-primary w-full p-2 rounded-lg mt-3 hover:transition-colors hover:bg-yellow-600"
      >
       {imageUploading ? "uploading..." :" Save"}
      </button>
    )}

    {/* Form Fields */}
    <div className="flex justify-center flex-col w-full mt-10">
      <label htmlFor="firstName" className="mr-3 mb-1">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        disabled={!isEditing}

        placeholder={userData?.data?.firstName}
        className="mt-1 border rounded-md border-gray-800 h-8  bg-gray-950 px-1"
      />

      <label htmlFor="lastName" className="mr-3 mb-1">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        disabled={!isEditing}
        placeholder={userData?.data.lastName}
        className="mt-1 border rounded-md border-gray-800 h-8  bg-gray-950 px-1"
      />
    </div>

    {/* Password Field */}
    <div className="flex justify-center w-full flex-col mt-10">

      {/* Email and Phone Number Fields */}
      <label htmlFor="email" className="mt-10">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        disabled={!isEditing}
        placeholder={userData?.data?.email}
        className="mt-1 border rounded-md border-gray-800 h-8  bg-gray-950 px-1"
      />

      <label htmlFor="phoneNumber" className="mt-10">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        disabled
        placeholder={userData?.data?.phoneNumber}
        className="mt-1 border rounded-md border-gray-800 h-8  bg-gray-950 px-1"
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
          {isEditing ? <button onClick={handleUserProfileUpdate} className="bg-transparent">Save</button>: "Edit Profile"}
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
    }
   </div>
  );
};

export default Profile;
