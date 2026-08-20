import { Mail, Lock, Eye, ArrowRight, Shield } from 'lucide-react';
import { FormLogo } from '../atoms/Logo';
import FormField from '../molecules/FormField';
import Checkbox from '../atoms/Checkbox';
import InfoAlert from '../molecules/InfoAlert';
import Button from '../atoms/Button';
import Divider from '../molecules/Divider';

export default function LoginForm() {
  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 pt-10 pb-8 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <FormLogo />
          <h2 className="text-[26px] font-bold text-[#111827] leading-tight text-center mt-5 mb-1.5">
            Digital Operations<br />Center (DOC)
          </h2>
          <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">
            Authorized Personnel Only
          </p>
        </div>

        <Divider text="SIGN IN TO COMMAND CENTER" />

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <FormField
            id="email"
            type="email"
            label="Official Email / ID"
            placeholder="id@election.gov"
            icon={Mail}
          />
          <FormField
            id="password"
            type="password"
            label="Secure Password"
            placeholder="••••••••"
            icon={Lock}
            rightIcon={Eye}
          />

          <div className="flex items-center justify-between pt-1 pb-1">
            <Checkbox id="remember" label="Remember me" />
            <a href="#" className="text-[13px] font-semibold text-[#2563eb] hover:text-blue-700">
              Forgot Password?
            </a>
          </div>

          <InfoAlert message="This system requires 2FA verification. Have your secure token ready after continuing." />

          <Button type="submit" variant="primary" className="mt-1 py-3 text-[15px]">
            Sign In <ArrowRight className="ml-1.5 w-4 h-4" strokeWidth={2.5} />
          </Button>
        </form>
      </div>

      <Divider text="OR" className="my-6" />

      <Button variant="outline" className="py-3 text-[14px] font-semibold text-[#374151] border-gray-200 shadow-sm relative w-full group">
        <Shield className="w-5 h-5 absolute left-4 text-gray-400 group-hover:text-gray-600" strokeWidth={1.5} />
        Sign in with Secure Token
        <ArrowRight className="w-4 h-4 absolute right-4 text-gray-400 group-hover:text-gray-600" strokeWidth={2} />
      </Button>

      <div className="mt-8 flex items-center justify-center text-[12px] font-medium text-gray-400">
        <Lock className="w-3.5 h-3.5 mr-1.5" />
        All access is monitored and recorded for security purposes.
      </div>
    </div>
  );
}
