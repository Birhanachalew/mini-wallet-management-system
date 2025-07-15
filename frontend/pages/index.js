import NavBar from '../components/NavBar';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Welcome to Mini Wallet Management System</h1>
        <p className="mb-6">A simple wallet app for rural financial agents.</p>
        <div className="space-x-4">
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
          <Link href="/dashboard" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Dashboard</Link>
        </div>
      </main>
    </div>
  );
}
