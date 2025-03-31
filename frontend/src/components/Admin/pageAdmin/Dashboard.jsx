import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistical } from "../../../redux/statisticalSlice";
import Chart from "chart.js/auto"; // Import Chart.js library

const Dashboard = () => {
  const dispatch = useDispatch();
  const chartContainer = useRef(null); // Reference to the chart container
  const { totalUsers, totalEvents, totalAttendance, totalFeedbacks } = useSelector((state) => state.statistical.statistical);

  useEffect(() => {
    dispatch(fetchStatistical());
  }, [dispatch]);

  useEffect(() => {
    const chartData = {
      labels: [
        "Người dùng",
        "Sự kiện",
        "Lượt tham gia",
        "Phản hồi",
      ],
      datasets: [
        {
          label: "Số lượng",
          data: [
            totalUsers,
            totalEvents,
            totalAttendance,
            totalFeedbacks,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Destroy the previous chart if it exists
    if (chartContainer.current) {
      if (chartContainer.current.chartInstance) {
        chartContainer.current.chartInstance.destroy();
      }

      // Render the new chart
      const newChartInstance = new Chart(chartContainer.current, {
        type: "bar",
        data: chartData,
        options: {
          // Add your chart options here if needed
        },
      });

      // Save the chart instance in the ref for future destruction
      chartContainer.current.chartInstance = newChartInstance;
    }
  }, [totalUsers, totalEvents, totalAttendance, totalFeedbacks]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mt-3">Thống Kê</h1>
      </div>
      {/* Chart */}
      <div className="w-full">
        <canvas ref={chartContainer}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
