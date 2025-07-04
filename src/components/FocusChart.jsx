import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const FocusChart = () => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('focusDurations')) || {};
    const last7 = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      return {
        label: key.slice(5),
        minutes: Math.floor((data[key] || 0) / 60)
      };
    });
    setWeeklyData(last7);
  }, []);

  const chartData = {
    labels: weeklyData.map(d => d.label),
    datasets: [{
      label: 'Fokus (menit)',
      data: weeklyData.map(d => d.minutes),
      backgroundColor: '#4ade80',
    }]
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Grafik Fokus 7 Hari Terakhir</h3>
      <Bar data={chartData} height={200} />
    </div>
  );
};

export default FocusChart;
