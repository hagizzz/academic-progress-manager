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

axios.defaults.withCredentials = true

function Courses() {
    const navigate = useNavigate()

    const theadColumn = ['Mã môn học', 'Tên môn học', 'Số tín chỉ', 'Khóa', 'Thao tác']
    const dispatch = useDispatch()
    //const courses = useSelector((state) => state.courses.courses)
    const { add, setPage, setSearch } = courseSlice.actions
    const { courses, page, limit, total, search } = useSelector((state) => state.courses)
    const isStart = page == 1
    const isEnd = page * limit >= total

    useEffect(() => {
        dispatch(fetchCourses())
    }, [search, page])

    async function addNewCourseHandler(formInfo) {
        const res = await axios.post('http://localhost:3000/courses', formInfo)
        const data = res.data
        dispatch(add(data))
    }

    // function handleDelete(courseId) {
    //     dispatch(removeCourse(courseId))
    // }

    function statsOnclick(courseId) {
        navigate(`/statistics/${courseId}`)
    }

    function gradesOnclick(courseId) {
        navigate(`/students/grade/${courseId}`)
    }

    function previousPage() {
        dispatch(setPage(page - 1))
    }

    function nextPage() {
        dispatch(setPage(page + 1))
    }

    function ButtonArea() {
        async function handleAddFile() {
            const formData = new FormData()
            formData.append('Năm học', Year)
            formData.append('Mã môn học', Code)
            formData.append('Tên môn học', Name)
            formData.append('Số tín chỉ', Credit)
            formData.append('Lý thuyết', TheoryPeriodAmount)
            formData.append('Thực hành-bt', PracticePeriodAmount)

            try {
                let res = await axios.post(`http://localhost:3000/courses/file`, formData)

                dispatch(fetchCourses())
            } catch (err) {
                errorMsg = err.response.data.message
            }
        }
        return (
            <div>
                <div className="inline mr-1 flex-end">
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
            <TableList
                title="Danh sách lớp mở"
                headers={theadColumn}
                onSearch={(e) => {
                    dispatch(setSearch(e.target.value))
                }}
                placeholder={'Tìm kiếm lớp mở...'}
                buttonArea={<ButtonArea />}
                onChange={(e) => {
                    dispatch(setSearch(e.target.value))
                }}
            >
                {courses.map((course, index) => {
                    return (
                        <tr key={course.id}>
                            <th>{course.id}</th>
                            <td>{course.subject.code}</td>
                            <td>{course.subject.name}</td>
                            <td>{course.subject.credit}</td>
                            <td>
                                {' ' +
                                    course.year.toString().slice(-2) +
                                    '-' +
                                    (course.year + 1).toString().slice(-2) +
                                    '/' +
                                    course.term}
                            </td>

                            <td>
                                <button className="link" onClick={() => statsOnclick(course.id)}>
                                    Thống kê
                                </button>{' '}
                                <span> / </span>
                                <button className="link" onClick={() => gradesOnclick(course.id)}>
                                    Xem điểm
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </TableList>
            <div className="join flex justify-center">
                <button
                    className={'join-item btn ' + (isStart ? 'btn-disabled' : '')}
                    onClick={previousPage}
                >
                    «
                </button>
                <button className="join-item btn">{page}</button>
                <button
                    className={'join-item btn ' + (isEnd ? 'btn-disabled' : '')}
                    onClick={nextPage}
                >
                    »
                </button>
            </div>
        </div>
    )
}

export default Courses
