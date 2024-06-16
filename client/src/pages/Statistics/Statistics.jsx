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
import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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

function Statistics() {
    let { courseId } = useParams()
    let [course, setCourse] = useState({})
    let [enrollCourses, setEnrollCourses] = useState([])
    let [scoresByClass, setScoresByClass] = useState({})
    let cards = useMemo(
        () => [
            {
                title: 'Số lượng sinh viên',
                value: enrollCourses.length,
            },
            {
                title: 'Tỉ lệ qua môn',
                value: `${passRate()}%`,
            },
            {
                title: 'Điểm trung bình',
                value: mean(),
            },
            {
                title: 'Độ lệch chuẩn',
                value: standardDeviation(),
            },
        ],
        [enrollCourses]
    )

    async function getCourse() {
        const id = parseInt(courseId)
        const res = await axios.get(`http://localhost:3000/courses/${id}`)
        setCourse(res.data)
    }

    async function getEnrollCourses() {
        const id = parseInt(courseId)
        let res = await axios.get(`http://localhost:3000/enroll-courses?courseId=${id}&limit=${1}`)

        let enroll = res.data[0]
        res = await axios.get(
            `http://localhost:3000/enroll-courses?subjectId=${enroll.course.subject.id}&year=${
                enroll.course.year
            }&term=${enroll.course.term}&limit=${100000}`
        )

        const scoresByClass = {}
        res.data.forEach((ec) => {
            let code = ec.course.classroom?.code
            if (!code) {
                return
            }

            if (!scoresByClass[code]) {
                scoresByClass[code] = []
            }
            scoresByClass[code].push(ec.score)
        })
        setEnrollCourses(res.data)
        setScoresByClass(scoresByClass)
    }

    function formatYear() {
        let year = course?.year
        let term = course?.term
        if (year) {
            return `${year.toString().slice(-2)}-${(year + 1).toString().slice(-2)}/${term}`
        }
        return ''
    }

    function mean() {
        return (
            Math.round(
                (enrollCourses.reduce((sum, ec) => sum + ec.score, 0) / enrollCourses.length) * 100
            ) / 100
        )
    }

    function standardDeviation() {
        return (
            Math.round(
                Math.sqrt(
                    enrollCourses.reduce((sum, ec) => sum + Math.pow(mean() - ec.score, 2), 0) /
                        (enrollCourses.length - 1)
                ) * 100
            ) / 100
        )
    }

    function passRate() {
        return (
            Math.round(
                (enrollCourses.filter((ec) => (ec.score || 0) >= 5).length / enrollCourses.length) *
                    10000
            ) / 100
        )
    }

    useEffect(() => {
        console.log(courseId)
        getCourse()
        getEnrollCourses()
    }, [])

    return (
        <div className="p-8">
            <h3 className="text-center my-5 font-bold">
                Thống kê môn {course?.subject?.name} ({formatYear()})
            </h3>
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
            <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="col-span-2">
                    <GradeHistChart scores={Object.values(scoresByClass).flat()} />
                </div>
                <div class="col-span-1">
                    <ClassPieChart
                        counts={Object.values(scoresByClass).map((scores) => scores.length)}
                        labels={Object.keys(scoresByClass)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
                <div class="col-span-2">
                    <GradeCompareHistChart scoresByClass={scoresByClass} />
                </div>
                {/* <GradeHistoryLineChart /> */}
                {/* <div className="flex-none">.</div> */}
            </div>
        </div>
    )
}

export default Statistics
