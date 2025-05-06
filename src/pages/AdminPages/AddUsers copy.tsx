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
import { useDropzone } from "react-dropzone";
import { EyeCloseIcon, EyeIcon, TimeIcon, EnvelopeIcon } from "../../icons";
import DatePicker from "../../components/form/date-picker.tsx";
import PhoneInput from "../../components/form/group-input/PhoneInput";

export default function AddUsers() {
  // State for DefaultInputs
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputWithPlaceholder, setInputWithPlaceholder] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentInput, setPaymentInput] = useState("");

  // State for SelectInputs
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // State for TextAreaInput
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");

  // State for InputStates
  const [email, setEmail] = useState("");
  const [emailTwo, setEmailTwo] = useState("");
  const [error, setError] = useState(false);

  // State for InputGroup
  const [emailGroup, setEmailGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // State for FileInputExample
  const [file, setFile] = useState<File | null>(null);

  // State for CheckboxComponents
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(true);
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);

  // State for RadioButtons
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  // State for ToggleSwitch
  const [switchOne, setSwitchOne] = useState(true);
  const [switchTwo, setSwitchTwo] = useState(true);
  const [switchThree, setSwitchThree] = useState(false);
  const [switchFour, setSwitchFour] = useState(true);
  const [switchFive, setSwitchFive] = useState(true);
  const [switchSix, setSwitchSix] = useState(false);

  // State for DropzoneComponent
  const [dropzoneFiles, setDropzoneFiles] = useState<File[]>([]);

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

  // Handlers
  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleMultiSelectChange = (value: string) => {
    setSelectedValues([value]);
  };

  const validateEmail = (value: string) => {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleEmailTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailTwo(value);
    validateEmail(value);
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSwitchChange = (checked: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(checked);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setDropzoneFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      inputValue,
      inputWithPlaceholder,
      selectedOption,
      password,
      date,
      time,
      paymentInput,
      selectedValues,
      message,
      messageTwo,
      email,
      emailTwo,
      emailGroup,
      phoneNumber,
      file,
      isChecked,
      isCheckedTwo,
      isCheckedDisabled,
      selectedValue,
      switchOne,
      switchTwo,
      switchThree,
      switchFour,
      switchFive,
      switchSix,
      dropzoneFiles,
    });
  };

  return (
    <div>
      <PageMeta
        title="Form Elements"
        description="Build and customize forms with various input elements and controls"
        ogTitle="Form Elements - Trux360 Fleet Management"
        ogDescription="Create dynamic forms with input fields, dropdowns, checkboxes and more"
      />
      <PageBreadcrumb pageTitle="Form Elements" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            {/* DefaultInputs */}
            <div>
              <Label htmlFor="input">Input</Label>
              <Input type="text" id="input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="inputTwo">Input with Placeholder</Label>
              <Input type="text" id="inputTwo" placeholder="info@gmail.com" value={inputWithPlaceholder} onChange={(e) => setInputWithPlaceholder(e.target.value)} />
            </div>
            <div>
              <Label>Select Input</Label>
              <Select options={options} placeholder="Select an option" onChange={handleSelectChange} className="dark:bg-dark-900" />
            </div>
            <div>
              <Label>Password Input</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                  {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />}
                </button>
              </div>
            </div>
            <div>
              <DatePicker id="date-picker" label="Date Picker Input" placeholder="Select a date" onChange={(dates, currentDateString) => setDate(currentDateString)} />
            </div>
            <div>
              <Label htmlFor="tm">Time Picker Input</Label>
              <div className="relative">
                <Input type="time" id="tm" name="tm" value={time} onChange={(e) => setTime(e.target.value)} />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <TimeIcon className="size-6" />
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="tm">Input with Payment</Label>
              <div className="relative">
                <Input type="text" placeholder="Card number" className="pl-[62px]" value={paymentInput} onChange={(e) => setPaymentInput(e.target.value)} />
                <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                    <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                    <path d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z" fill="#FC6020" />
                  </svg>
                </span>
              </div>
            </div>

            {/* SelectInputs */}
            <div>
              <Label>Multiple Select Options</Label>
              <Select options={multiOptions} placeholder="Select Options" onChange={handleMultiSelectChange} className="dark:bg-dark-900" />
            </div>

            {/* TextAreaInput */}
            <div>
              <Label>Description</Label>
              <TextArea value={message} onChange={(value) => setMessage(value)} rows={6} />
            </div>
            <div>
              <Label>Description (Disabled)</Label>
              <TextArea rows={6} disabled />
            </div>
            <div>
              <Label>Description (Error)</Label>
              <TextArea rows={6} value={messageTwo} error onChange={(value) => setMessageTwo(value)} hint="Please enter a valid message." />
            </div>

            {/* InputStates */}
            <div>
              <Label>Email</Label>
              <Input type="email" value={email} error={error} onChange={handleEmailChange} placeholder="Enter your email" hint={error ? "This is an invalid email address." : ""} />
            </div>
            <div>
              <Label>Email (Success)</Label>
              <Input type="email" value={emailTwo} success={!error} onChange={handleEmailTwoChange} placeholder="Enter your email" hint={!error ? "This is a success message." : ""} />
            </div>
            <div>
              <Label>Email (Disabled)</Label>
              <Input type="text" value="disabled@example.com" disabled placeholder="Disabled email" />
            </div>

            {/* InputGroup */}
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Input placeholder="info@gmail.com" type="text" className="pl-[62px]" value={emailGroup} onChange={(e) => setEmailGroup(e.target.value)} />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <EnvelopeIcon className="size-6" />
                </span>
              </div>
            </div>
            <div>
              <Label>Phone</Label>
              <PhoneInput selectPosition="start" countries={countries} placeholder="+1 (555) 000-0000" onChange={handlePhoneNumberChange} />
            </div>
            <div>
              <Label>Phone (End)</Label>
              <PhoneInput selectPosition="end" countries={countries} placeholder="+1 (555) 000-0000" onChange={handlePhoneNumberChange} />
            </div>

            {/* FileInputExample */}
            <div>
              <Label>Upload file</Label>
              <FileInput onChange={handleFileChange} className="custom-class" />
            </div>

            {/* CheckboxComponents */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">Default</span>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={isCheckedTwo} onChange={setIsCheckedTwo} label="Checked" />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={isCheckedDisabled} onChange={setIsCheckedDisabled} disabled label="Disabled" />
              </div>
            </div>

            {/* RadioButtons */}
            <div className="flex flex-wrap items-center gap-8">
              <Radio id="radio1" name="group1" value="option1" checked={selectedValue === "option1"} onChange={handleRadioChange} label="Default" />
              <Radio id="radio2" name="group1" value="option2" checked={selectedValue === "option2"} onChange={handleRadioChange} label="Selected" />
              <Radio id="radio3" name="group1" value="option3" checked={selectedValue === "option3"} onChange={handleRadioChange} label="Disabled" disabled={true} />
            </div>

            {/* ToggleSwitch */}
            <div className="flex gap-4">
              <Switch label="Default" defaultChecked={true} onChange={(checked) => handleSwitchChange(checked, setSwitchOne)} />
              <Switch label="Checked" defaultChecked={true} onChange={(checked) => handleSwitchChange(checked, setSwitchTwo)} />
              <Switch label="Disabled" disabled={true} />
            </div>
            <div className="flex gap-4">
              <Switch label="Default" defaultChecked={true} onChange={(checked) => handleSwitchChange(checked, setSwitchFour)} color="gray" />
              <Switch label="Checked" defaultChecked={true} onChange={(checked) => handleSwitchChange(checked, setSwitchFive)} color="gray" />
              <Switch label="Disabled" disabled={true} color="gray" />
            </div>

            {/* DropzoneComponent */}
            <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
              <form {...getRootProps()} className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${isDragActive ? "border-brand-500 bg-gray-100 dark:bg-gray-800" : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"}`} id="demo-upload">
                <input {...getInputProps()} />
                <div className="dz-message flex flex-col items-center m-0!">
                  <div className="mb-[22px] flex justify-center">
                    <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      <svg className="fill-current" width="29" height="28" viewBox="0 0 29 28" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">{isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}</h4>
                  <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">Drag and drop your PNG, JPG, WebP, SVG images here or browse</span>
                  <span className="font-medium underline text-theme-sm text-brand-500">Browse File</span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}
