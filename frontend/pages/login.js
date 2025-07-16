import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Agent Login</h1>
        <AuthForm />
      </div>
    </div>
  );
}
