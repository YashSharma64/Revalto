import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Services/api";
import Navbar from "@/components/Common/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");
      setUser(data.user || data);
    } catch (err) {
      console.error("Profile fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();

}, []);

  if (loading) return (
  <div>
    <Navbar/>
    <div className="p-6 text-center">Loading profile...</div>
  </div>);

  const profileImage = user?.imgUrl || user?.annonymousImgUrl || "/user.png";
  const joined = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-";

  const displayName = user?.name || 'Not Available';
  const displayUsername = user?.userName || 'user';
  const displayBio = user?.bio || 'सुधरी हे तो बस मेरी आदते वरना मेरे शौक वो तो आज भी तेरी औकात से ऊँचे हैं';

  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
        <section className="bg-white rounded-2xl shadow p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="shrink-0">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden bg-white ring-4 ring-white shadow">
                <img src={profileImage} alt={displayName} className="w-full h-full object-cover"/>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{displayName}</h1>
                  <div className="mt-1 text-sm text-gray-500">@{displayUsername}</div>
                </div>

                <div>
                  <button
                    onClick={() => navigate('/profile/edit')}
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-full text-sm shadow"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <p className="mt-4 text-gray-700 max-w-3xl">{displayBio}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1 rounded-lg text-sm text-gray-700">{user?.hostel || 'No hostel'}</span>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${user?.isVerified ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-gray-50 text-gray-700 border border-gray-100'}`}>{user?.isVerified ? 'Verified' : 'Unverified'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* About card below header */}
        <section className="bg-white rounded-2xl shadow p-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">About</h2>
            <div className="text-sm text-gray-500">Joined <span className="font-medium text-gray-800">{joined}</span></div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-sm font-medium text-gray-800">{user?.email || '-'}</div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-500">Gender</div>
                <div className="text-sm font-medium text-gray-800">{user?.gender || '-'}</div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-500">Phone</div>
                <div className="text-sm font-medium text-gray-800">{user?.phone || '-'}</div>
              </div>
            </div>

            <div className="space-y-2 md:border-l md:border-gray-100 md:pl-6">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-500">Hostel</div>
                <div className="text-sm font-medium text-gray-800">{user?.hostel || '-'}</div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-500">Room Number</div>
                <div className="text-sm font-medium text-gray-800">{user?.roomNumber ?? '-'}</div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-500">Academic Year</div>
                <div className="text-sm font-medium text-gray-800">{user?.academicYear || '-'}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
}
