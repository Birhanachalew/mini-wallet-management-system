import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TransactionChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [
          {
            label: 'Balance Over Time',
            data: data.map(d => d.balance),
            fill: true,
            backgroundColor: 'rgba(59,130,246,0.1)',
            borderColor: '#2563eb',
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#2563eb',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: '#e5e7eb' } },
        },
      },
    });
    return () => chartInstance.current?.destroy();
  }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 mt-8">
      <h3 className="font-bold mb-2 text-blue-700">Balance Trend</h3>
      <canvas ref={chartRef} height={120} />
    </div>
  );
}
