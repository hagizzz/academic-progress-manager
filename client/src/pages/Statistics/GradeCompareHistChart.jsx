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

const range = 0.2

const labels = Array(Math.floor(11 / range) - 4)
    .fill(0)
    .map((each, index) => index * range)

const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(53, 162, 235, 1)',
    'rgba(75, 192, 192, 1)',
    'orange',
    'purple',
    'yellow',
    'gray',
]

function GradeCompareHistChart({ scoresByClass }) {
    const datasets = Object.entries(scoresByClass).map((entry, index) => {
        const [classCode, scores] = entry
        const frequences = labels.map((label) => {
            if (label == 0) {
                return scores.filter((score) => label <= score && score <= label + 1).length
            }
            return scores.filter((score) => label < score && score <= label + 1).length
        })
        return {
            label: classCode,
            data: frequences,
            borderColor: colors[index],
            pointStyle: false,
        }
    })

    const data = {
        labels: labels.map((label) => Math.floor(label * 100) / 100),
        datasets,
    }

    return (
        <div className="card bg-base-0 shadow-xl">
            <div className="card-body p-6">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}

export default GradeCompareHistChart
