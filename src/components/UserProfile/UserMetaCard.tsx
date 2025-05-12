import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import PhoneInput from "../form/input/PhoneInput";
import CountrySelect from "../form/input/CountrySelect";
import StateSelect from "../form/input/StateSelect";
import CitySelect from "../form/input/CitySelect";
import Select from "../form/Select";
import { useState } from "react";
import FileInput from "../form/input/FileInput";
import usePutData from "../../hooks/usePutData";

interface UserMetaCardProps {
  profileData: any;
}

export default function UserMetaCard({ profileData }: UserMetaCardProps) {
  const { isOpen, openModal, closeModal } = useModal();

  console.log("profileData", profileData);
  const { putData, loading } = usePutData(
    `/api/user/update-profile/${profileData?.id}`,
    { verifyAuth: true }
  );

  const [file, setFile] = useState<any>();

  const handleFileChange = (file: File | null, fileDataURL: string) => {
    setFile(file);
  };
  const [formData, setFormData] = useState({
    first_name: profileData?.first_name || "",
    last_name: profileData?.last_name || "",
    email: profileData?.email || "",
    phone_number: profileData?.phone_number?.toString() || "",
    country: profileData?.country || "",
    state: profileData?.state || "",
    city: profileData?.city || "",
    status: profileData?.status || "active",
  });

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  const handleInputChange = (field: string, value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value || "",
    }));
  };

  const handleSave = async () => {
    try {
      await putData(formData);
      closeModal();
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            {/* <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800"> */}
            {/* <img src="/images/user/owner.jpg" alt="user" /> */}
            <FileInput onFileChange={handleFileChange} />
            {/* </div> */}
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {profileData?.first_name} {profileData?.last_name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(profileData?.role?.rolename)?.toUpperCase()}
                </p>
                {profileData?.phone_number && (
                  <>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {profileData?.phone_number}
                    </p>
                  </>
                )}
                {profileData?.status && (
                  <>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(profileData?.status)?.toUpperCase()}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <PhoneInput
                      value={formData.phone_number || ""}
                      onChange={(value) =>
                        handleInputChange("phone_number", value)
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <CountrySelect
                      value={formData.country}
                      onChange={(value) => handleInputChange("country", value)}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <StateSelect
                      country={formData.country}
                      value={formData.state}
                      onChange={(value) => handleInputChange("state", value)}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <CitySelect
                      country={formData.country}
                      state={formData.state}
                      value={formData.city}
                      onChange={(value) => handleInputChange("city", value)}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Status</Label>
                    <Select
                      options={statusOptions}
                      value={formData.status}
                      onChange={(value) => handleInputChange("status", value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
