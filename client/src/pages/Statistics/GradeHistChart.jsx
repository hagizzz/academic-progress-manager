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
const range = 0.2

const labels = Array(Math.floor(11 / range) - 2)
    .fill(0)
    .map((each, index) => index * range)

function GradeHistChart({ scores }) {
    const frequences = labels.map((label) => {
        if (label == 0) {
            return scores.filter((score) => label <= score && score <= label + 1).length
        }
        return scores.filter((score) => label < score && score <= label + 1).length
    })

    const data = {
        labels: labels.map((label, index) => Math.floor(label * 100) / 100),
        datasets: [
            {
                data: frequences,
                backgroundColor: 'rgba(53, 162, 235, 0.7)',
            },
        ],
    }

    return (
        <div className="card bg-base-0 shadow-xl">
            <div className="card-body p-6">
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}

export default GradeHistChart
