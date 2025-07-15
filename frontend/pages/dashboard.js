export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Wallet Dashboard</h1>
      {/* BalanceCard, TransactionForm, AlertBanner components will go here */}
      <div className="mb-6">Balance: <span className="font-mono">$0.00</span></div>
      <div className="mb-6">Low Balance Alert: <span className="text-red-600">None</span></div>
      <div>Transaction Form Placeholder</div>
    </div>
  );
}
