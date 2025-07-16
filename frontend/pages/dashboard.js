import BalanceCard from '../components/BalanceCard';
import AlertBanner from '../components/AlertBanner';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import TransactionChart from '../components/TransactionChart';
import StatsCards from '../components/StatsCards';
import TransactionTypeChart from '../components/TransactionTypeChart';
import ActivityFeed from '../components/ActivityFeed';
import UserProfile from '../components/UserProfile';
import TransactionFilter from '../components/TransactionFilter';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

// Demo/mock data for dashboard enhancements
const mockChartData = [
  { date: '2025-07-01', balance: 1000 },
  { date: '2025-07-02', balance: 1200 },
  { date: '2025-07-03', balance: 900 },
  { date: '2025-07-04', balance: 1500 },
  { date: '2025-07-05', balance: 1300 },
  { date: '2025-07-06', balance: 1700 },
];
const mockStats = {
  total: 24,
  cashIn: 14,
  cashOut: 10,
  lastAmount: 200,
};
const mockTypeData = { cashIn: 14, cashOut: 10 };
const mockActivities = [
  { type: 'cash-in', message: 'Cash in: 200 ETB', time: '2 min ago' },
  { type: 'cash-out', message: 'Cash out: 100 ETB', time: '10 min ago' },
  { type: 'cash-in', message: 'Cash in: 500 ETB', time: '1 hr ago' },
];
const mockUser = { name: 'Demo User', email: 'demo@wallet.com', avatar: '' };

  const { user, loading } = useAuth();
  const router = useRouter();
  const agentId = user ? user.id || 'demo-agent' : 'demo-agent';
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState({ search: '', type: 'all' });

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-blue-700 text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-800 drop-shadow">Wallet Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/4">
          <UserProfile user={user || mockUser} />
          <BalanceCard agentId={agentId} />
          <AlertBanner agentId={agentId} />
        </div>
        <div className="md:w-3/4">
          <StatsCards stats={mockStats} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TransactionChart data={mockChartData} />
            <TransactionTypeChart data={mockTypeData} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <TransactionForm onTransact={() => setRefresh(r => !r)} />
          <ActivityFeed activities={mockActivities} />
        </div>
        <div className="col-span-2">
          <TransactionFilter onFilter={setFilter} />
          <TransactionTable agentId={agentId} key={refresh} filter={filter} />
        </div>
      </div>
    </div>
  );
// ...existing code...
