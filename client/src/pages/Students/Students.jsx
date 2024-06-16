import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents, removeStudent } from '../../redux/studentSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChartSimple,
    faPencil,
    faPlus,
    faTrashCan,
    faUpload,
} from '@fortawesome/free-solid-svg-icons'
import TableList from '../../components/TableList'
import Form from '../../components/Form'
import studentSlice from '../../redux/studentSlice'
import axios from 'axios'
import RequirePermission from '../../components/RequirePermission'
import { DeleteStudentPermission } from '../../helpers/permissions'

axios.defaults.withCredentials = true

function Students() {
    const theadColumn = [
        'Tên hiển thị',
        'MSSV',
        'Email',
        'Giới tính',
        'Dân tộc',
        'Quê quán',
        'Thao tác',
    ]
    const dispatch = useDispatch()
    const { add, setPage, setSearch } = studentSlice.actions
    const { students, page, limit, total, search } = useSelector((state) => state.students)
    const isStart = page == 1
    const isEnd = page * limit >= total

    useEffect(() => {
        dispatch(fetchStudents())
    }, [search, page])

    async function addNewUserHandler(formInfo) {
        const res = await axios.post('http://localhost:3000/students', formInfo)
        const data = res.data
        dispatch(add(data))
    }

    function handleDelete(studentId) {
        dispatch(removeStudent(studentId))
        dispatch(fetchStudents())
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
                <div className="inline mr-1">
                    <button
                        className="btn btn-primary btn-sm normal-case text-white"
                        onClick={() => document.getElementById('add-new-form').showModal()}
                    >
                        Thêm sinh viên <FontAwesomeIcon icon={faPlus} />
                    </button>

                    <Form
                        id="add-new-form"
                        form_title="Thêm sinh viên mới"
                        form_content="Thông tin sinh viên"
                        fields={[
                            {
                                type: 'text',
                                name: 'fullname',
                                label: 'Họ và tên: ',
                                placeholder: 'Nhập họ và tên...',
                            },
                            {
                                type: 'text',
                                name: 'email',
                                label: 'Email: ',
                                placeholder: 'Nhập email...',
                            },
                        ]}
                        onSubmit={addNewUserHandler}
                    />
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
                        let res = await axios.post('http://localhost:3000/students/file', formData)
                        dispatch(fetchStudents())
                    }}
                />
            </div>
        )
    }
    return (
        <div>
            <TableList
                title="Danh sách sinh viên"
                headers={theadColumn}
                onSearch={(e) => {
                    dispatch(setSearch(e.target.value))
                }}
                placeholder={'Tìm kiếm sinh viên...'}
                buttonArea={<ButtonArea />}
            >
                {students.map((student, index) => {
                    return (
                        <tr key={student.id}>
                            <th>{student.id}</th>
                            <td>{student.fullname}</td>
                            <td>{student.code}</td>
                            <td>{student.email}</td>
                            <td>{student.gender}</td>
                            <td>{student.ethnicity}</td>
                            <td>{student.address}</td>
                            <td>
                                <button className="btn btn-sm normal-case ">
                                    Thống kê <FontAwesomeIcon icon={faChartSimple} />
                                </button>{' '}
                                <RequirePermission permission={DeleteStudentPermission}>
                                    <button
                                        className="btn btn-sm normal-case font-light bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </RequirePermission>
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

export default Students
