import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function AlertBanner({ agentId }) {
  const { data, error } = useSWR(
    agentId ? `/api/alerts?agentId=${agentId}` : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (error) return null;
  if (!data || !data.alerts || data.alerts.length === 0) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-5 mb-6 rounded-xl shadow relative overflow-hidden" role="alert">
      <p className="font-extrabold text-lg flex items-center gap-2">
        <svg className="w-6 h-6 text-yellow-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
        Low Balance Alert
      </p>
      {data.alerts.map((alert, idx) => (
        <span key={idx} className="block mt-1 font-medium">{alert.message}</span>
      ))}
    </div>
  );
}
