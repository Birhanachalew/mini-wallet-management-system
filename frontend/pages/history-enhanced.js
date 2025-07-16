import TransactionTable from '../components/TransactionTable';
import TransactionFilter from '../components/TransactionFilter';
import ActivityFeed from '../components/ActivityFeed';
import { useState } from 'react';

// Demo/mock data for activity feed
const mockActivities = [
  { type: 'cash-in', message: 'Cash in: 200 ETB', time: '2 min ago' },
  { type: 'cash-out', message: 'Cash out: 100 ETB', time: '10 min ago' },
  { type: 'cash-in', message: 'Cash in: 500 ETB', time: '1 hr ago' },
];

export default function EnhancedHistoryPage() {
  const agentId = 'demo-agent'; // Replace with real agentId from auth state
  const [filter, setFilter] = useState({ search: '', type: 'all' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 md:p-12">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-800 drop-shadow">Transaction History</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <ActivityFeed activities={mockActivities} />
        </div>
        <div className="col-span-2">
          <TransactionFilter onFilter={setFilter} />
          <TransactionTable agentId={agentId} filter={filter} />
        </div>
      </div>
    </div>
  );
}
