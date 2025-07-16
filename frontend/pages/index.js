import NavBar from '../components/NavBar';
import Link from 'next/link';
import { FaWallet, FaShieldAlt, FaBolt, FaHeadset } from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
        {/* Hero Section */}
        <section className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12 py-16 md:py-28">
          {/* Illustration */}
          <div className="flex-1 flex justify-center md:justify-start">
            <FaWallet size={120} className="text-blue-600 drop-shadow-xl" />
          </div>
          {/* Text & CTA */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 leading-tight drop-shadow-lg">
              The <span className="text-green-600">Mini Wallet</span> for Rural Agents
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-xl">
              Send, receive, and manage your money securely and instantly. Trusted by agents across the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
              <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-lg">Get Started</Link>
              <a href="#features" className="bg-white border border-blue-600 text-blue-700 px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition text-lg">Learn More</a>
            </div>
            {/* Trust Badges */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <FaShieldAlt size={32} className="text-green-600" title="Secure" />
              <FaBolt size={32} className="text-yellow-500" title="Fast" />
              <FaHeadset size={32} className="text-blue-400" title="Support" />
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="w-full max-w-5xl mx-auto py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">Why Mini Wallet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              <h3 className="font-bold text-blue-700 mb-2">Real-Time Balance</h3>
              <p className="text-gray-600 text-center">Check wallet balances instantly and securely, anytime.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v4m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
              <h3 className="font-bold text-green-700 mb-2">Easy Transactions</h3>
              <p className="text-gray-600 text-center">Cash in, cash out, and view history with a few clicks.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
              <h3 className="font-bold text-yellow-600 mb-2">Alerts & Security</h3>
              <p className="text-gray-600 text-center">Get notified of low balances and keep your funds safe.</p>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="w-full max-w-3xl mx-auto text-center py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">Ready to get started?</h2>
          <p className="text-gray-700 mb-6">Join thousands of agents using Mini Wallet to manage their finances with confidence.</p>
          <Link href="/login" className="bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-lg">Create Your Free Account</Link>
        </section>
        <footer className="mt-12 text-gray-400 text-sm text-center">&copy; {new Date().getFullYear()} Mini Wallet. All rights reserved.</footer>
      </main>
    </div>
  );
}
