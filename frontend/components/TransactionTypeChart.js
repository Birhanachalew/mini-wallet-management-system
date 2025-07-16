import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TransactionTypeChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Cash In', 'Cash Out'],
        datasets: [
          {
            data: [data.cashIn, data.cashOut],
            backgroundColor: ['#22c55e', '#ef4444'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { display: true, position: 'bottom' },
        },
      },
    });
    return () => chartInstance.current?.destroy();
  }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 mt-8 flex flex-col items-center">
      <h3 className="font-bold mb-2 text-blue-700">Transaction Types</h3>
      <canvas ref={chartRef} height={120} style={{ maxWidth: 220 }} />
    </div>
  );
}
