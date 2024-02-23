import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, removeCourse } from '../../redux/courseSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faFilter, faUpload } from '@fortawesome/free-solid-svg-icons'
import TableList from '../../components/TableList'
import Form from '../../components/Form'
import courseSlice from '../../redux/courseSlice'
import axios from 'axios'
import OpenCourseForm from '../../components/OpenNewCourse'
import { useNavigate } from 'react-router-dom'

function Courses() {
    const navigate = useNavigate()

    const theadColumn = ['Mã môn học', 'Tên môn học', 'Tên lớp', 'Khóa', 'Lịch học']
    // const dispatch = useDispatch()
    // const courses = useSelector((state) => state.courses.courses)
    // const { add } = courseSlice.actions

    const courses = [
        {
            subjectName: 'Đại số tuyến tính',
            term: 1,
            year: 2020,
            staffName: 'Trần Ngọc Hội',
            amountStudent: '100/100',
            credit: 4,
            finished: true,
        },
        {
            subjectName: 'Mạng máy tính',
            term: 2,
            year: 2022,
            staffName: 'Võ Đức Cẩm Hải',
            amountStudent: '95/100',
            credit: 4,
            finished: false,
        },
        {
            subjectName: 'Cấu trúc dữ liệu và giải thuật',
            term: 1,
            year: 2021,
            staffName: 'Hà Văn Thảo',
            amountStudent: '150/150',
            credit: 4,
            finished: false,
        },
        {
            subjectName: 'Cơ sở dữ liệu',
            term: 2,
            year: 2021,
            staffName: 'Nguyễn Hiền Lương',
            amountStudent: '115/120',
            credit: 4,
            finished: false,
        },
        {
            subjectName: 'Lý thuyết thống kê',
            term: 2,
            year: 2021,
            staffName: 'Nguyễn Văn Thìn',
            amountStudent: '150/150',
            credit: 4,
            finished: true,
        },
        {
            subjectName: 'Đại số tuyến tính',
            term: 1,
            year: 2021,
            staffName: 'Trần Ngọc Hội',
            amountStudent: '100/100',
            credit: 4,
            finished: false,
        },
    ]

    // useEffect(() => {
    //     dispatch(fetchCourses())
    // }, [])

    async function addNewCourseHandler(formInfo) {
        const res = await axios.post('http://localhost:3000/courses', formInfo)
        const data = res.data
        dispatch(add(data))
    }

    function handleDelete(courseId) {
        dispatch(removeCourse(courseId))
    }

    function statsOnclick() {
        navigate('/statistics')
    }

    function ButtonArea() {
        return (
            <div>
                <div className="inline mr-1">
                    <button
                        className="btn btn-primary btn-sm normal-case"
                        onClick={() => document.getElementById('open-new-course').showModal()}
                    >
                        Mở môn học <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <OpenCourseForm />
                </div>

                <button className="btn btn-sm normal-case bg-green-700 text-white hover:bg-green-800">
                    Nhập từ excel <FontAwesomeIcon icon={faUpload} />
                </button>
            </div>
        )
    }

    return (
        <div>
            {/* <div
                tabIndex={0}
                role="button"
                className="btn btn-sm normal-case bg-primary text-white hover:bg-primary-focus mr-1 left-10"
            >
                Lọc <FontAwesomeIcon icon={faFilter} />
            </div> */}
            <div className="flex flex-wrap items-center">
                {courses.map((course, index) => {
                    return (
                        <div
                            className="card w-80 bg-base-100 shadow-lg m-10 mr-0 h-[250px] hover:translate-y-[-3px] transition-all duration-300"
                            key={index}
                        >
                            <div className="card-body ">
                                <h2 className="card-title h-4">
                                    {course.subjectName +
                                        ' ' +
                                        '(' +
                                        course.year.toString().slice(-2) +
                                        '-' +
                                        (course.year + 1).toString().slice(-2) +
                                        '/' +
                                        course.term +
                                        ')'}
                                </h2>
                                <div className="divider m-0 h-4"></div>
                                <div className="text-base">
                                    <p>GV phụ trách: {course.staffName}</p>
                                    <p>Số lượng đăng ký: {course.amountStudent}</p>
                                    <p>Số tín chỉ: {course.credit}</p>
                                </div>

                                <div className="card-actions absolute bottom-4 right-4">
                                    <button
                                        className="btn btn-success btn-sm normal-case"
                                        onClick={statsOnclick}
                                    >
                                        Thống kê
                                    </button>

                                    <button
                                        className={
                                            'btn btn-primary btn-sm normal-case ' +
                                            (course.finished ? '' : 'btn-disabled')
                                        }
                                    >
                                        Xem điểm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Courses
