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

const data = {
    labels: ['TTH1', 'TTH2', 'CNTN'],
    datasets: [
        {
            label: '# of Votes',
            data: [45, 42, 13],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

function ClassPieChart() {
    return (
        <div className="card bg-base-0 shadow-xl">
            <div className="card-body p-6">
                <Pie options={options} data={data} />
            </div>
        </div>
    )
}

export default ClassPieChart
