import { useRouter } from 'next/router';
import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (data) => {
    // After successful signup, redirect to dashboard or login
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignupForm onSignup={handleSignup} />
      <div className="absolute top-4 right-4">
        <a href="/login" className="text-blue-600 hover:underline">Already have an account? Login</a>
      </div>
    </div>
  );
}
