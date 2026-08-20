import AuthLayout from '../components/templates/AuthLayout';
import SidebarInfo from '../components/organisms/SidebarInfo';
import LoginForm from '../components/organisms/LoginForm';

export default function Login() {
  return (
    <AuthLayout
      sidebarContent={<SidebarInfo />}
      mainContent={<LoginForm />}
    />
  );
}
