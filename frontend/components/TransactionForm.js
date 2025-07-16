import { useState } from 'react';

export default function TransactionForm({ onTransact }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('cash-in');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/wallet/transact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), type })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Transaction failed');
      setSuccess('Transaction successful!');
      setAmount('');
      onTransact && onTransact();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8 border border-gray-200">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-700 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v4m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
        Cash In / Cash Out
      </h2>
      {error && <div className="mb-2 text-red-600 font-medium text-center">{error}</div>}
      {success && <div className="mb-2 text-green-700 font-medium text-center">{success}</div>}
      <div className="mb-5">
        <label className="block mb-1 font-semibold text-blue-700">Amount (ETB)</label>
        <input
          type="number"
          min="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm hover:shadow-md bg-white text-black"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-blue-700">Type</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm hover:shadow-md bg-white text-black"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="cash-in">Cash In</option>
          <option value="cash-out">Cash Out</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
}
