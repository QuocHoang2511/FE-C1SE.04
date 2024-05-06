import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ColumnChart = () => {
    // Dữ liệu của đồ thị
    const data = {
        labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        datasets: [
            {
                label: "",
                backgroundColor: "#6249FF",
                borderColor: "#6249FF",
                borderWidth: 1,
                hoverBackgroundColor: "#2805FF",
                hoverBorderColor: "#FFFFF",
                barPercentage: 0.3,
                data: [65, 59, 80, 81, 56, 32, 81, 56,65, 59, 80, 81],
            },
        ],
    };

    // Cấu hình của đồ thị
    const options = {
        scales: {
            x: {
                
                grid: {
                    display: false, // Ẩn đường kẻ của trục x
                },
                type: "category", // Sử dụng scale kiểu 'category' cho trục x
                labels: [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12",
                ],
            },
            y: {
                
                beginAtZero: true,
                grid: {
                    display: false, // Ẩn đường kẻ của trục y
                },
                
            },
            
        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ColumnChart;
