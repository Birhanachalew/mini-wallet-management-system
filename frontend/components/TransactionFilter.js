import { useState } from 'react';

export default function TransactionFilter({ onFilter }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, type });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-center mb-6">
      <input
        type="text"
        placeholder="Search by amount or note..."
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full md:w-64"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="cash-in">Cash In</option>
        <option value="cash-out">Cash Out</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
      >
        Filter
      </button>
    </form>
  );
}
