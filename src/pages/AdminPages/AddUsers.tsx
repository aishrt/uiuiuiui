import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import TextArea from "../../components/form/input/TextArea";
import FileInput from "../../components/form/input/FileInput";
import Checkbox from "../../components/form/input/Checkbox";
import Radio from "../../components/form/input/Radio";
import Switch from "../../components/form/switch/Switch";
import { EyeCloseIcon, EyeIcon, TimeIcon, EnvelopeIcon } from "../../icons";
import DatePicker from "../../components/form/date-picker.tsx";
import PhoneInput from "../../components/form/group-input/PhoneInput";

export default function AddUsers() {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("active");

  // Options for Select and MultiSelect
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const multiOptions = [
    { value: "1", label: "Option 1", selected: false },
    { value: "2", label: "Option 2", selected: false },
    { value: "3", label: "Option 3", selected: false },
    { value: "4", label: "Option 4", selected: false },
    { value: "5", label: "Option 5", selected: false },
  ];

  // Countries for PhoneInput
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];

  // Options for role and status
  const roleOptions = [
    { value: "superadmin", label: "Super Admin" },
    { value: "manager", label: "Manager" },
    { value: "company", label: "Company" },
    { value: "subadmin", label: "Sub Admin" },
    { value: "bookie", label: "Bookie" },
    { value: "trackie", label: "Trackie" },
    { value: "runner", label: "Runner" },
    { value: "transporter", label: "Transporter" },
    { value: "clearing_agent", label: "Clearing Agent" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      first_name: firstName,
      last_name: lastName,
      country,
      city,
      state,
      postal_code: postalCode,
      phone_number: phoneNumber,
      email,
      role,
      company,
      password,
      status,
    });
  };

  return (
    <div>
      <PageMeta
        title="Add User"
        description="Add a new user to the system"
        ogTitle="Add User - Trux360 Fleet Management"
        ogDescription="Add a new user with various roles and details"
      />
      <PageBreadcrumb pageTitle="Add User" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="col-6 space-y-6">
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                options={roleOptions}
                placeholder="Select Role"
                onChange={(value) => setRole(value)}
                className="dark:bg-dark-900"
              />
            </div>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                options={statusOptions}
                placeholder="Select Status"
                onChange={(value) => setStatus(value)}
                className="dark:bg-dark-900"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
