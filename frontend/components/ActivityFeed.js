export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mt-8">
      <h3 className="font-bold mb-2 text-blue-700">Recent Activity</h3>
      <ul className="divide-y divide-gray-200">
        {activities.length === 0 && <li className="py-2 text-gray-400">No recent activity.</li>}
        {activities.map((a, i) => (
          <li key={i} className="py-2 flex items-center gap-3">
            <span className={`inline-block w-2 h-2 rounded-full ${a.type === 'cash-in' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="font-medium text-gray-700">{a.message}</span>
            <span className="ml-auto text-xs text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
