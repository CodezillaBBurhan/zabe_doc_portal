import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { FormLogo } from '../atoms/Logo';
import FormField from '../molecules/FormField';
import InfoAlert from '../molecules/InfoAlert';
import Button from '../atoms/Button';
import Divider from '../molecules/Divider';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Simulate reset action, then go to login or show success state
    navigate('/login');
  };

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 pt-10 pb-8 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <FormLogo />
          <h2 className="text-[24px] font-bold text-on-surface leading-tight text-center mt-5 mb-2">
            Reset Password
          </h2>
          <p className="text-[13px] text-gray-500 text-center px-4">
            Enter your official email or ID. We'll send you instructions to reset your secure password.
          </p>
        </div>

        <Divider text="ACCOUNT RECOVERY" />

        <form className="space-y-5" onSubmit={handleReset}>
          <FormField
            id="email"
            type="email"
            label="Official Email / ID"
            placeholder="id@election.gov"
            icon={Mail}
          />

          <InfoAlert message="A verification link will be sent. The link expires in 15 minutes." />

          <div className="flex flex-col gap-3 mt-4">
            <Button type="submit" variant="primary" className="py-3 text-[15px]">
              Send Reset Link <ArrowRight className="ml-1.5 w-4 h-4" strokeWidth={2.5} />
            </Button>
            
            <Link to="/login" className="flex items-center justify-center text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors mt-2">
              <ArrowLeft className="w-4 h-4 mr-1.5" strokeWidth={2.5} /> Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
