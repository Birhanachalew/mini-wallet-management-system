export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-blue-100 rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <span className="text-2xl font-bold text-blue-700">{stats.total}</span>
        <span className="text-gray-600 mt-1">Total Transactions</span>
      </div>
      <div className="bg-green-100 rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <span className="text-2xl font-bold text-green-700">{stats.cashIn}</span>
        <span className="text-gray-600 mt-1">Cash In</span>
      </div>
      <div className="bg-red-100 rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <span className="text-2xl font-bold text-red-700">{stats.cashOut}</span>
        <span className="text-gray-600 mt-1">Cash Out</span>
      </div>
      <div className="bg-yellow-100 rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <span className="text-2xl font-bold text-yellow-700">{stats.lastAmount} ETB</span>
        <span className="text-gray-600 mt-1">Last Transaction</span>
      </div>
    </div>
  );
}
