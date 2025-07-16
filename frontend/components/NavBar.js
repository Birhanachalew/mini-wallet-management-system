import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center rounded-b-2xl shadow-lg border-b-4 border-blue-800">
      <div className="font-extrabold text-2xl tracking-tight flex items-center gap-2">
        <svg className="w-7 h-7 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
        Mini Wallet
      </div>
      <div className="space-x-4 flex items-center">
        <Link href="/login" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 transition font-semibold shadow">Login</Link>
        <Link href="/signup" className="px-4 py-2 rounded-lg bg-white text-blue-700 border border-blue-600 hover:bg-blue-50 transition font-semibold shadow">Sign Up</Link>
      </div>
    </nav>
  );
}
