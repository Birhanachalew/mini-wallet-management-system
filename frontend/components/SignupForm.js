import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      login(data); // log in and redirect
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 relative">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="absolute left-4 top-4 flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 transition shadow-sm"
        tabIndex={-1}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-100 rounded-full p-3 mb-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <h2 className="text-2xl font-extrabold text-blue-800">Sign Up</h2>
        <p className="text-gray-500 text-sm mt-1">Create your new account</p>
      </div>
      {error && <div className="mb-3 text-red-600 text-center font-medium">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm hover:shadow-md bg-white text-black"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm hover:shadow-md bg-white text-black"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm hover:shadow-md bg-white text-black"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      <div className="mt-6 text-center">
        <span className="text-gray-500 text-sm">Already have an account? </span>
        <a href="/login" className="text-blue-600 hover:underline font-medium">Login</a>
      </div>
    </form>
  );
}
