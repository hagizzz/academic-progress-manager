import { Bar } from 'react-chartjs-2'

const options = {
    responsive: true,
    plugins: {
        legend: false,
        title: {
            display: true,
            text: 'Phổ điểm tổng kết',
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
            data: [0, 0, 0, 0, 1, 2, 3, 4, 6, 6, 9, 11, 13, 15, 18, 20, 18, 16, 12, 8, 5],
            backgroundColor: 'rgba(53, 162, 235, 0.7)',
        },
    ],
}

function GradeHistChart() {
    return (
        <div className="card bg-base-0 shadow-xl">
            <div className="card-body p-6">
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}

export default GradeHistChart
