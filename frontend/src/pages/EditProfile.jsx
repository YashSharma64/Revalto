import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { api } from "@/components/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ANONYMOUS_IMAGES = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous1",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous2",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous3",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous5",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous6",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous7",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous8",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous9",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous10",
];

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [formData, setFormData] = useState({
    userName: "", name: "", email: "", password: "",
    gender: "", phone: "", hostel: "", roomNumber: "",
    academicYear: "", isProfileAnonymous: false,
    imgUrl: "", annonymousImgUrl: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData({
        userName: user.userName || "", name: user.name || "", email: user.email || "",
        password: "", gender: user.gender || "", phone: user.phone || "",
        hostel: user.hostel || "", roomNumber: user.roomNumber?.toString() || "",
        academicYear: user.academicYear || "", isProfileAnonymous: user.isProfileAnonymous ?? false,
        imgUrl: user.imgUrl || "", annonymousImgUrl: user.annonymousImgUrl || "",
      });
      if (user.imgUrl) setProfileImagePreview(user.imgUrl);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      setUploadedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let dataToSend = { ...formData };
      if (uploadedImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImageFile);
        reader.onload = async () => {
          dataToSend.imgUrl = reader.result;
          await submitForm(dataToSend);
        };
        return;
      }
      await submitForm(dataToSend);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
      setLoading(false);
    }
  };

  const submitForm = async (dataToSend) => {
    if (!dataToSend.password) delete dataToSend.password;
    if (dataToSend.roomNumber) {
      dataToSend.roomNumber = parseInt(dataToSend.roomNumber) || null;
    } else {
      dataToSend.roomNumber = null;
    }
    const response = await api.put("/user/profile", dataToSend, { withCredentials: true });
    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("user", JSON.stringify(response.data.user || response.data));
      alert("Profile updated successfully!");
      navigate("/");
    } else {
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  const currentProfileImage = profileImagePreview || formData.imgUrl || "/user.png";
  const currentAnonymousImage = formData.annonymousImgUrl || ANONYMOUS_IMAGES[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

          {/* Profile Picture */}
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
            <div className="flex gap-6 items-center">
              <div className="relative">
                <img src={currentProfileImage} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-200 object-cover" onError={(e) => e.target.src = "/user.png"} />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 bg-gray-900 text-white rounded-full p-2 hover:bg-gray-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
              <div>
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="mb-2">Upload Picture</Button>
                {uploadedImageFile && <p className="text-sm text-green-600">{uploadedImageFile.name} selected</p>}
              </div>
            </div>
          </div>

          {/* Anonymous Images */}
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-lg font-semibold mb-4">Anonymous Avatar</h2>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {ANONYMOUS_IMAGES.map((img, i) => (
                <button key={i} type="button" onClick={() => setFormData(prev => ({ ...prev, annonymousImgUrl: img }))}
                  className={`relative aspect-square rounded-lg border-2 overflow-hidden ${formData.annonymousImgUrl === img || (!formData.annonymousImgUrl && i === 0) ? "border-gray-900 ring-2" : "border-gray-200"}`}>
                  <img src={img} alt={`Avatar ${i + 1}`} className="w-full h-full object-cover" />
                  {(formData.annonymousImgUrl === img || (!formData.annonymousImgUrl && i === 0)) && (
                    <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                      <div className="bg-gray-900 text-white rounded-full p-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input name="userName" value={formData.userName} onChange={handleChange} required className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} required className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hostel</label>
                <select name="hostel" value={formData.hostel} onChange={handleChange} className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <option value="">Select Hostel</option>
                  <option value="Your_Space_01">Your Space 01</option>
                  <option value="Your_Space_02">Your Space 02</option>
                  <option value="UniSpace_Boys">UniSpace Boys</option>
                  <option value="UniSpace_Girls">UniSpace Girls</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Room Number</label>
                <Input name="roomNumber" type="number" value={formData.roomNumber} onChange={handleChange} className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Academic Year</label>
                <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <option value="">Select Year</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="Third">Third</option>
                  <option value="Fourth">Fourth</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="anonymous" name="isProfileAnonymous" checked={formData.isProfileAnonymous} onChange={handleChange} className="w-4 h-4" />
              <label htmlFor="anonymous" className="text-sm font-medium">Make Profile Anonymous</label>
            </div>

            <input type="hidden" name="imgUrl" value={formData.imgUrl} />
            <input type="hidden" name="annonymousImgUrl" value={formData.annonymousImgUrl} />

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/")} className="flex-1 h-10">Cancel</Button>
              <Button type="submit" disabled={loading} className="flex-1 h-10 bg-gray-900 hover:bg-gray-800 text-white">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
