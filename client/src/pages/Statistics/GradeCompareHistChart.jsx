import { Line } from 'react-chartjs-2'

const options = {
    responsive: true,
    plugins: {
        legend: true,
        title: {
            display: true,
            text: 'So sánh phổ điểm tổng kết giữa các lớp',
        },
    },
}

const range = 0.5

const labels = Array(11 / range - 1)
    .fill(0)
    .map((each, index) => index * range)

const data = {
    labels,
    datasets: [
        {
            label: 'TTH1',
            data: [0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 4, 6, 8, 11, 12, 11, 9, 6, 3, 2, 1],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointStyle: false,
        },
        {
            label: 'TTH2',
            data: [0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 6, 8, 11, 12, 11, 9, 6, 4, 2, 2, 1],
            backgroundColor: 'rgba(53, 162, 235, 1)',
            borderColor: 'rgba(53, 162, 235, 1)',
            pointStyle: false,
        },
        {
            label: 'CNTN',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 4, 6, 8, 10, 11, 10, 7, 4, 3, 1],
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointStyle: false,
        },
    ],
}

function GradeCompareHistChart() {
    return (
        <div className="card bg-base-0 shadow-xl">
            <div className="card-body p-6">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}

export default GradeCompareHistChart
