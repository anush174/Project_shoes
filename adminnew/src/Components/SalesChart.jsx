import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      data: [820, 940, 1100, 980, 1380, 1650, 1234],
      borderColor: '#6C63FF',
      backgroundColor: 'rgba(108,99,255,.18)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Orders x10',
      data: [210, 260, 300, 250, 380, 420, 380],
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56,189,248,.1)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const options = { responsive: true, plugins: { legend: { position: 'bottom' } } }

export default function SalesChart() {
  return <Line data={data} options={options} height={120} />
}
