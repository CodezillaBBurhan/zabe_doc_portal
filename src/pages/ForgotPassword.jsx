import AuthLayout from '../components/templates/AuthLayout';
import SidebarInfo from '../components/organisms/SidebarInfo';
import ForgotPasswordForm from '../components/organisms/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <AuthLayout
      sidebarContent={<SidebarInfo />}
      mainContent={<ForgotPasswordForm />}
    />
  );
}
