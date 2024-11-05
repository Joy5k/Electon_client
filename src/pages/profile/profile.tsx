import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios';
import { IAuthResponse, ImgBBResponseData, IQrCodeData } from "../../types";
import { useGetUserQuery, useUpdateUserMutation } from "../../redux/features/userManagement/userManagement";
import { useAuth2Mutation, useVerifyAuth2Mutation } from "../../redux/features/auth/authApi";
import SelectDivision from "../../components/selectDivision/selectDivision";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploadLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isOpenModal, setOpenModal] = useState<boolean>(false); // State to manage modal visibility
  const [qrCodeSecret,setQrCodeSecrete]=useState<IQrCodeData>()
  const [qrVerifySecret,setVerifyCode]=useState<string>()
  // redux queries and mutations
  const [userUpdate, { isLoading: updatingUserInfo }] = useUpdateUserMutation();
  const [qrCodeData]=useAuth2Mutation()
  const { data: userData } = useGetUserQuery({});
  const [qrCodeVerify]=useVerifyAuth2Mutation({})
  const [formData, setFormData] = useState({
    firstName: "",
    image: "",
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
        password: "",
      });
    }
  }, [userData]);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSaveImage = async () => {
    if (!file) return;

    setImageUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post<ImgBBResponseData>(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`, 
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data && response.data.data && response.data.data.url) {
        const uploadedImageUrl = response.data.data.url;
        setImagePreview(uploadedImageUrl);
        toast.success('Image Uploaded successfully');
        setImageUploadLoading(false);

        setFormData((prevFormData) => ({
          ...prevFormData,
          image: uploadedImageUrl
        }));

        await userUpdate({ image: uploadedImageUrl });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handleUserProfileUpdate = async () => {
    try {
      await userUpdate(formData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Update failed. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  // Modal handle functions
  const toggleModal = (): void => {
    setOpenModal(!isOpenModal);
    createAuth2Secret()
  };

// request to server for creating 2FA code
const createAuth2Secret=async():Promise<void>=>{
  const res:IAuthResponse=await qrCodeData({}).unwrap()
  setQrCodeSecrete(res.data)

}

// verify qr authentication code
const handleVerifySecret=async():Promise<void>=>{
    const res=await  qrCodeVerify({token:qrVerifySecret}).unwrap()
  console.log(res)
  if(res.success){
    toast.success("Successfully Enabled Two-step Authentication")
    setOpenModal(false)
  }
}
  return (
    <div>
        <div className="w-screen p-4 mt-5 lg:mt-10">
      <div className="w-full text-white px-2 rounded-lg">
        {updatingUserInfo ? (
          <p className="text-primary text-2xl font-bold text-center">Updating User Info...</p>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Image and Basic Info Section */}
            <section className="flex flex-col items-center lg:w-2/12 mb-10">
              <img
                className="rounded-lg w-52 h-36"
                src={imagePreview || userData?.data?.image}
                alt="Profile Picture"
              />
              <input
                id="imageUpload"
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="imageUpload" className="w-full p-2 bg-blue-950 text-white text-center rounded-lg cursor-pointer mt-2">
                Change your picture
              </label>
              {imagePreview && (
                <button
                  onClick={handleSaveImage}
                  className="bg-primary p-2 rounded-lg mt-3 w-full"
                >
                  {imageUploading ? "Uploading..." : "Save"}
                </button>
              )}
              <div className="mt-4 w-full">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full mt-1 border rounded-md bg-gray-950 px-2 py-1"
                />
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full mt-1 border rounded-md bg-gray-950 px-2 py-1"
                />
              </div>
            </section>

            {/* Contact Info and About Me Section */}
            <section className="lg:w-2/3 -mt-5">
              <h4 className="text-2xl animate-pulse font-bold mb-2">Information</h4>
              <hr className="mb-10" />
              <div className="flex flex-col gap-5  flex-1">
                {/* all input files div flexing here */}
                <div className="flex flex-col md:flex-row lg:flex-row flex-wrap gap-6">
                  <div>
                    <label>Email</label>
                    <p>{userData?.data?.email}</p>
                  </div>
                  {/* phoneNumber */}
                  <div>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full mt-1 border border-gray-800 rounded-md bg-gray-950 px-2 py-1"
                    />
                  </div>

                  {/* Two-step authentication */}
                  <div>
                    <label htmlFor="twoStep">Two-step Authentication</label> <br />
                    <span>
                      {
                        userData?.data?.auth2 ? <p className="text-green-400">Enabled</p> : 
                        <button onClick={toggleModal} className="text-red-500 bg-gray-800 px-2 ">Enable</button>
                      }
                    </span>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-emerald-500">Address</h1>
                  <SelectDivision/>
                  </div>
                </div>
                <label>About Me</label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full mt-1 border border-gray-800 rounded-lg bg-gray-950 px-2 py-1"
                />
              </div>
            </section>
          </div>
        )}
        <div className="flex justify-center mt-4">
        <button
            onClick={toggleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            {isEditing ? <button onClick={handleUserProfileUpdate}>Save</button> : "Edit Profile"}
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
    </div>
    {/* modal and qr code part start below */}
    {
      isOpenModal && 
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
       <div className="border border-gray-800 p-2 relative">
        <div className="flex justify-center flex-col items-center align-middle ">
          <img src={qrCodeSecret?.qrCode} className="w-fit" alt="qr code" />
          <p className="mt-5 font-sans font-bold">Note: <span className="text-primary animate-pulse">{qrCodeSecret?.message}</span></p>
      
        </div>
        <div className="mt-6">
        <label htmlFor="verifyCode" className="font-bold text-start w-full">Enter 6 Digit Code</label> <br />
        <input onChange={(e) => setVerifyCode(e.target.value)} type="text" className=" border border-gray-700 p-1 w-full mb-2 mt-1" placeholder="256 587"/>
      </div>
      <button onClick={handleVerifySecret} className="bg-gray-900 text-green-500 p-2 px-8 w-full font-bold hover:bg-gray-800">Verify</button>
        <button onClick={toggleModal} className="absolute text-2xl  px-2 right-0 top-0 ">X</button>
       </div>
      </div>
    }
    </div>
  
  );
};

export default Profile;
