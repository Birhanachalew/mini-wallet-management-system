
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Notification from './Notification';

const fetcher = url => fetch(url).then(res => res.json());
const LOW_BALANCE_THRESHOLD = 1000; // You can make this configurable

export default function BalanceCard({ agentId }) {
  const { data, error, isLoading } = useSWR(
    agentId ? `/api/wallet/balance?agentId=${agentId}` : null,
    fetcher,
    { refreshInterval: 5000 }
  );
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (data && typeof data.balance === 'number' && data.balance < LOW_BALANCE_THRESHOLD) {
      setShowNotif(true);
    } else {
      setShowNotif(false);
    }
  }, [data]);

  if (isLoading) return <div className="p-6 bg-gray-100 rounded-2xl shadow animate-pulse text-gray-700">Loading balance...</div>;
  if (error) return <div className="p-6 bg-red-100 rounded-2xl text-red-700 shadow">Failed to load balance</div>;

  return (
    <>
      <Notification
        message={showNotif ? "Low balance! Please top up your wallet." : ""}
        onClose={() => setShowNotif(false)}
      />
      <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center">
        <span className="text-blue-700 font-semibold">Wallet Balance</span>
        <span className="text-4xl font-extrabold text-blue-800 mt-2 drop-shadow-lg">{data?.balance ?? '--'} <span className="text-lg font-bold">ETB</span></span>
      </div>
    </>
  );
}
