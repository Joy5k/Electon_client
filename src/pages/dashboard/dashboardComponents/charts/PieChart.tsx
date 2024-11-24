import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ chartData }: any) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
      className="w-10"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Data Distribution",
            },
            
          },
        
        }}
      />
    </div>
  );
}

export default PieChart;
