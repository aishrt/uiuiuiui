import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import UpdatePasswordForm from "../../components/auth/UpdatePasswordForm";

export default function UpdatePassword() {
  return (
    <>
      <PageMeta
        title="Update Password"
        description="Update your Trux360 account password to regain access to your fleet management platform"
        ogTitle="Update Password - Trux360"
        ogDescription="Update your Trux360 account password to regain access to your fleet management platform"
      />
      <AuthLayout>
        <UpdatePasswordForm />
      </AuthLayout>
    </>
  );
}
