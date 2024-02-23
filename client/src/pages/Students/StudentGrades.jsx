import SearchFilterClassroom from '../../components/SearchFilterClassroom'
import { fetchClassrooms } from '../../redux/classroomSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import classroomSlice from '../../redux/classroomSlice'
import TableList from '../../components/TableList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan, faFilter, faUpload } from '@fortawesome/free-solid-svg-icons'

const enrollCourses = [
    {
        id: 9,
        score: 5,
        year: 2020,
        term: 1,
        student: {
            fullname: 'Võ Hà Giang',
            code: '20110172',
        },
        subject: {
            name: 'Đại số tuyến tính',
            code: 'MTH00030',
            subjectType: 'BB',
            credit: 3,
        },
        class: {
            code: '20TTH1',
        },
    },
    {
        id: 7,
        score: 10,
        year: 2021,
        term: 1,
        student: {
            fullname: 'Võ Hà Giang',
            code: '20110172',
        },
        subject: {
            name: 'Cấu trúc dữ liệu và Giải thuật',
            code: 'MTH10418',
            subjectType: 'TC',
            credit: 4,
        },
        class: {
            code: '20TTH1',
        },
    },
    {
        id: 8,
        score: 8,
        year: 2021,
        term: 1,
        student: {
            fullname: 'Võ Hà Giang',
            code: '20110172',
        },
        subject: {
            name: 'Giải tích 3A',
            code: 'MTH00014',
            subjectType: 'BB',
            credit: 4,
        },
        class: {
            code: '20TTH1',
        },
    },
    {
        id: 11,
        score: 9,
        year: 2021,
        term: 1,
        student: {
            fullname: 'Nguyễn Đình Đăng Khoa',
            code: '20110217',
        },
        subject: {
            name: 'Giải tích 3A',
            code: 'MTH00014',
            subjectType: 'BB',
            credit: 4,
        },
        class: {
            code: '20TTH1',
        },
    },
    {
        id: 12,
        score: 8,
        year: 2020,
        term: 1,
        student: {
            fullname: 'Nguyễn Đình Đăng Khoa',
            code: '20110217',
        },
        subject: {
            name: 'Đại số tuyến tính',
            code: 'MTH00030',
            subjectType: 'BB',
            credit: 3,
        },
        class: {
            code: '20TTH1',
        },
    },
]

function StudentGrades() {
    const dispatch = useDispatch()
    const courses = useSelector((state) => state.classrooms.classrooms)
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

    useEffect(() => {
        dispatch(fetchClassrooms())
    }, [])

    function ButtonArea() {
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
                <button className="btn btn-sm normal-case bg-green-700 text-white hover:bg-green-800">
                    Nhập từ excel <FontAwesomeIcon icon={faUpload} />
                </button>
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
                {enrollCourses.map((course, index) => {
                    return (
                        <tr key={course.id}>
                            <th>{index + 1}</th>

                            <td>{yearTermFormat(course.year, course.term)}</td>
                            <td>{course.student.fullname}</td>
                            <td>{course.student.code}</td>
                            <td>
                                {course.subject.code} - {course.subject.name}
                            </td>
                            <td>{course.subject.subjectType}</td>
                            <td>{course.subject.credit}</td>
                            <td>{course.class.code}</td>
                            <td>{course.score}</td>

                            {/* <td>
                                <button className="btn btn-sm normal-case font-light ">
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>{' '}
                                <button
                                    className="btn btn-sm normal-case font-light bg-red-500 text-white hover:bg-red-600"
                                    onClick={() => {}}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </td> */}
                        </tr>
                    )
                })}
            </TableList>
        </div>
    )
}

export default StudentGrades
