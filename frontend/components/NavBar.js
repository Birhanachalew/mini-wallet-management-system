import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
      <div className="font-bold">Mini Wallet</div>
      <div className="space-x-4">
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/history" className="hover:underline">History</Link>
      </div>
    </nav>
  );
}
