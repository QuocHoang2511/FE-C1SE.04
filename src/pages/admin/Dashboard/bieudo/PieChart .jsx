import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const PieChart = ({ blood }) => {
  console.log("blood - ", blood);
  // Dữ liệu từ 4 cơ sở dữ liệu
  const data = {
    labels: ["NHÓM MÁU O", "NHÓM MÁU A", "NHHOMS MÁU B", "NHÓM MÁU AB"],
    datasets: [
      {
        // data: [45, 35, 15, 5], // Dữ liệu phải thêm tổng 100%
        data: blood, // Dữ liệu phải thêm tổng 100%
        backgroundColor: ["#0D62FF", "#E5E5E5", "#8400D5", "#1AF430"],
        hoverBackgroundColor: ["#075EFF", "#C8C8C8", "#8400D5", "#1AF430"],
      },
    ],
  };

  // Tính tổng số
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

  // Tùy chọn của biểu đồ
  const options = {
    maintainAspectRatio: false, // Tắt tỷ lệ khung cảnh để có thể điều chỉnh kích thước tự do
    plugins: {
      legend: {
        display: true,
        position: "", // Hiển thị chú giải ở bên phải
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const percent = (
              (dataset.data[tooltipItem.index] / total) *
              100
            ).toFixed(2);
            return `${dataset.label}: ${percent}%`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "250px",
        height: "250px",
        margin: "auto",
      }}
    >
      <h2
        style={{
          fontWeight: "600",
          color: "#333333",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      >
        Theo Dõi Lượng Máu
      </h2>
      <Doughnut data={data} options={options} width={200} height={200} />
      <div style={{ textAlign: "center", marginTop: "-20px" }}>
        <p
          style={{
            color: "#333",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "1rem",
          }}
        >
          Tổng Số Máu
        </p>
      </div>
    </div>
  );
};

export default PieChart;
