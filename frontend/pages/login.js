export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Agent Login</h1>
        {/* AuthForm component will go here */}
        <form>
          <input className="w-full mb-4 p-2 border rounded" type="email" placeholder="Email" required />
          <input className="w-full mb-4 p-2 border rounded" type="password" placeholder="Password" required />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
