import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import useGetData from "../hooks/useGetData";
import { useAuthStore } from "../store/authStore";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  bio: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
  meta?: {
    role: string;
    department: string;
    join_date: string;
  };
}

interface ApiResponse {
  data: UserProfile;
}

export default function UserProfiles() {
  const [profileData, setProfileData] = useState<any | null>(null);
  const { getData, loading, error } = useGetData<ApiResponse>();
  const updateUserRole = useAuthStore((state) => state.updateUserRole);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response: any = await getData(`/api/auth/profile`);
        if (response) {
          setProfileData(response);
          updateUserRole(response.role?.rolelevel);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    if (!profileData) {
      fetchProfileData();
    }
  }, []);

  console.log("profileData", profileData);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading profile data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Error loading profile data</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="User Profile"
        description="Manage your Trux360 user profile, preferences, and account settings"
        ogTitle="User Profile - Trux360 Fleet Management"
        ogDescription="Manage your account settings and preferences on Trux360"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <UserMetaCard profileData={profileData} />
          <UserInfoCard profileData={profileData} />
          <UserAddressCard profileData={profileData} />
        </div>
      </div>
    </>
  );
}
