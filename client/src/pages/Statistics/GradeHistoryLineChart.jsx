import { Line } from 'react-chartjs-2'

const options = {
    responsive: true,
    plugins: {
        legend: false,
        title: {
            display: true,
            text: 'Điểm trung bình qua từng học kì',
        },
    },
}

const range = 0.5

const labels = [
    '2018/1',
    '2018/2',
    '2019/1',
    '2019/2',
    '2020/1',
    '2020/2',
    '2021/1',
    '2021/2',
    '2022/1',
    '2022/2',
    '2023/1',
    '2023/2',
]

const data = {
    labels,
    datasets: [
        {
            data: [7.2, 8, 8.2, 8, 7.86, 8, 7.5, 8.2, 8.5, 8.8, 8.1, 7.5],
            backgroundColor: 'rgba(53, 162, 235, 0.7)',
        },
    ],
}

function GradeHistoryLineChart() {
    return (
        <div className="card bg-base-0 shadow-xl col-span-2">
            <div className="card-body p-6">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}

export default GradeHistoryLineChart
