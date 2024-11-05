import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios';
import { ImgBBResponseData } from "../../types";
import { useGetUserQuery, useUpdateUserMutation } from "../../redux/features/userManagement/userManagement";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploadLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [userUpdate, { isLoading: updatingUserInfo }] = useUpdateUserMutation();

  const { data: userData } = useGetUserQuery({});

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

  const handleInputChange = (e: any) => {
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

  return (
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
              <div className="flex flex-col gap-5">
                {/* all input files div flexing here */}
                <div className="flex flex-col md:flex-row lg:flex-row gap-6">
                  <div>
                    <label>Email</label>
                    <p>{userData?.data?.email}</p>
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full mt-1  border border-gray-800 rounded-md bg-gray-950 px-2 py-1"
                    />
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
  );
};

export default Profile;
