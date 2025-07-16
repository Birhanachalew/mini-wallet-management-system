import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function TransactionTable({ agentId }) {
  const { data, error, isLoading } = useSWR(
    agentId ? `/api/wallet/history?agentId=${agentId}` : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (isLoading) return <div className="p-6 bg-gray-100 rounded-2xl shadow animate-pulse text-gray-700">Loading transactions...</div>;
  if (error) return <div className="p-6 bg-red-100 rounded-2xl text-red-700 shadow">Failed to load transactions</div>;
  if (!data || !data.transactions || data.transactions.length === 0) return <div className="p-6 bg-gray-50 rounded-2xl shadow text-gray-700">No transactions found.</div>;

  return (
    <div className="overflow-x-auto mt-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
        <table className="min-w-full bg-transparent rounded-2xl">
          <thead>
            <tr className="bg-gray-100 text-blue-800">
              <th className="px-4 py-3 font-bold text-left rounded-tl-2xl">Date</th>
              <th className="px-4 py-3 font-bold text-left">Type</th>
              <th className="px-4 py-3 font-bold text-left">Amount (ETB)</th>
              <th className="px-4 py-3 font-bold text-left">Status</th>
              <th className="px-4 py-3 font-bold text-left rounded-tr-2xl">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((tx, idx) => (
              <tr key={idx} className="border-t hover:bg-blue-50 transition group">
                <td className="px-4 py-2 group-hover:font-semibold">{new Date(tx.date).toLocaleString()}</td>
                <td className="px-4 py-2 capitalize group-hover:font-semibold">{tx.type}</td>
                <td className="px-4 py-2 group-hover:font-semibold">{tx.amount}</td>
                <td className="px-4 py-2 group-hover:font-semibold">{tx.status}</td>
                <td className="px-4 py-2">
                  {tx.receipt ? <a href={tx.receipt} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 transition">View</a> : '-' }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
