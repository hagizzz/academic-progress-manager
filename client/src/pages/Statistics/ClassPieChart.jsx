import { Pie } from 'react-chartjs-2'

const options = {
    responsive: true,
    plugins: {
        legend: true,
        title: {
            display: true,
            text: 'Tỉ lệ học sinh đăng kí môn giữa các lớp',
        },
    },
}

const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(53, 162, 235, 1)',
    'rgba(75, 192, 192, 1)',
    'orange',
    'purple',
    'yellow',
    'gray',
]

function ClassPieChart({ counts, labels }) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Số sinh viên',
                data: counts,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    }
    return (
        <div className="card bg-base-0 shadow-xl h-full">
            <div className="card-body p-6">
                <Pie options={options} data={data} />
            </div>
        </div>
    )
}

export default ClassPieChart
