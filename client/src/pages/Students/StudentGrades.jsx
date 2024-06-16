import { fetchClassrooms } from '../../redux/classroomSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TableList from '../../components/TableList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

// const enrollCourses = [
//     {
//         id: 9,
//         score: 5,
//         year: 2020,
//         term: 1,
//         student: {
//             fullname: 'Võ Hà Giang',
//             code: '20110172',
//         },
//         subject: {
//             name: 'Đại số tuyến tính',
//             code: 'MTH00030',
//             subjectType: 'BB',
//             credit: 3,
//         },
//         class: {
//             code: '20TTH1',
//         },
//     },
//     {
//         id: 7,
//         score: 10,
//         year: 2021,
//         term: 1,
//         student: {
//             fullname: 'Võ Hà Giang',
//             code: '20110172',
//         },
//         subject: {
//             name: 'Cấu trúc dữ liệu và Giải thuật',
//             code: 'MTH10418',
//             subjectType: 'TC',
//             credit: 4,
//         },
//         class: {
//             code: '20TTH1',
//         },
//     },
//     {
//         id: 8,
//         score: 8,
//         year: 2021,
//         term: 1,
//         student: {
//             fullname: 'Võ Hà Giang',
//             code: '20110172',
//         },
//         subject: {
//             name: 'Giải tích 3A',
//             code: 'MTH00014',
//             subjectType: 'BB',
//             credit: 4,
//         },
//         class: {
//             code: '20TTH1',
//         },
//     },
//     {
//         id: 11,
//         score: 9,
//         year: 2021,
//         term: 1,
//         student: {
//             fullname: 'Nguyễn Đình Đăng Khoa',
//             code: '20110217',
//         },
//         subject: {
//             name: 'Giải tích 3A',
//             code: 'MTH00014',
//             subjectType: 'BB',
//             credit: 4,
//         },
//         class: {
//             code: '20TTH1',
//         },
//     },
//     {
//         id: 12,
//         score: 8,
//         year: 2020,
//         term: 1,
//         student: {
//             fullname: 'Nguyễn Đình Đăng Khoa',
//             code: '20110217',
//         },
//         subject: {
//             name: 'Đại số tuyến tính',
//             code: 'MTH00030',
//             subjectType: 'BB',
//             credit: 3,
//         },
//         class: {
//             code: '20TTH1',
//         },
//     },
// ]

function StudentGrades() {
    const dispatch = useDispatch()
    const courses = useSelector((state) => state.classrooms.classrooms)
    const [enrollCourses, setEnrollCourses] = useState([])
    let { courseId } = useParams()
    let [course, setCourse] = useState({})

    const theadColumn = [
        'NH/HK',
        'Tên sinh viên',
        'MSSV',
        'Môn học',
        'Loại học phần',
        'Số tín chỉ',
        'Lớp',
        'Điểm',
    ]

    async function getEnrollCourses() {
        let res
        if (courseId) {
            res = await axios.get(`http://localhost:3000/enroll-courses?courseId=${courseId}`)
        } else {
            res = await axios.get(`http://localhost:3000/enroll-courses`)
        }
        setEnrollCourses(res.data)
    }

    useEffect(() => {
        dispatch(fetchClassrooms())
        getEnrollCourses()
        console.log(courseId)
    }, [])

    function ButtonArea() {
        async function handleAddFile() {
            const formData = new FormData()
            formData.append('Họ và tên', Name)
            formData.append('MSSV', Code)
            formData.append('Email', Email)
            formData.append('Giới tính', Gender)
            formData.append('Dân tộc', Ethnicity)
            formData.append('Quê quán', Address)

            try {
                let res = await axios.post(`http://localhost:3000/students/file`, formData)

                dispatch(fetchStudents())
            } catch (err) {
                errorMsg = err.response.data.message
            }
        }
        return (
            <div>
                <div className="dropdown inline mr-1">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm normal-case bg-primary text-white hover:bg-primary-focus"
                    >
                        Lọc <FontAwesomeIcon icon={faFilter} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
                <label
                    htmlFor="import-file"
                    className="btn btn-sm normal-case bg-green-700 text-white hover:bg-green-800"
                >
                    Nhập từ excel <FontAwesomeIcon icon={faUpload} />
                </label>
                <input
                    id="import-file"
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    hidden
                    onChange={async (e) => {
                        const file = e.target.files[0]
                        const formData = new FormData()
                        formData.append('excel', file)
                        console.log(formData)
                        let res = await axios.post(
                            'http://localhost:3000/enroll-courses/file',
                            formData
                        )
                        dispatch(fetchStudents())
                    }}
                />
            </div>
        )
    }

    function yearTermFormat(year, term) {
        const y1 = year.toString().slice(-2)
        const y2 = (year + 1).toString().slice(-2)
        return `${y1}-${y2}/${term}`
    }

    return (
        <div>
            <TableList
                title="Kết quả học tập của sinh viên"
                headers={theadColumn}
                buttonArea={<ButtonArea />}
            >
                {enrollCourses.map((enrollCourse, index) => {
                    return (
                        <tr key={enrollCourse.id}>
                            <th>{index + 1}</th>
                            <td>
                                {yearTermFormat(enrollCourse.course.year, enrollCourse.course.term)}
                            </td>
                            <td>{enrollCourse.student.fullname}</td>
                            <td>{enrollCourse.student.code}</td>
                            <td>
                                {enrollCourse.course.subject.code} -{' '}
                                {enrollCourse.course.subject.name}
                            </td>
                            <td>{enrollCourse.course.subject.subjectType}</td>
                            <td>{enrollCourse.course.subject.credit}</td>
                            <td>{enrollCourse.course.classroom.code}</td>
                            <td>{enrollCourse.score}</td>
                        </tr>
                    )
                })}
            </TableList>
        </div>
    )
}

export default StudentGrades
