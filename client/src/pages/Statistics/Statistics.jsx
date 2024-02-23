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
    ArcElement,
} from 'chart.js'
import GradeHistChart from './GradeHistChart.jsx'
import GradeCompareHistChart from './GradeCompareHistChart.jsx'
import ClassPieChart from './ClassPieChart.jsx'
import GradeHistoryLineChart from './GradeHistoryLineChart.jsx'

ChartJS.register(
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

const cards = [
    {
        title: 'Số lượng sinh viên',
        value: '144/150',
    },
    {
        title: 'Tỉ lệ qua môn',
        value: '82%',
    },
    {
        title: 'Điểm trung bình',
        value: '7.25',
    },
    {
        title: 'Độ lệch chuẩn',
        value: '1.79',
    },
]

function Statistics() {
    return (
        <div className="p-8">
            <h3 className="text-center my-5 font-bold">Thống kê môn Đại số tuyến tính (20-21/1)</h3>
            <div className="grid grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div className="card bg-base-0 shadow-xl" key={index}>
                        <div className="card-body p-6">
                            <p>{card.title}</p>
                            <p className="text-3xl text-secondary font-bold">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
                <GradeHistChart />
                <GradeCompareHistChart />
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
                <ClassPieChart />
                <GradeHistoryLineChart />
                <div className="flex-none">.</div>
            </div>
        </div>
    )
}

export default Statistics
