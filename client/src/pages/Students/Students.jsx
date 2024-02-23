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
    const students = useSelector((state) => state.students.students)
    const { add } = studentSlice.actions

    useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    async function addNewUserHandler(formInfo) {
        const res = await axios.post('http://localhost:3000/students', formInfo)
        const data = res.data
        dispatch(add(data))
    }

    function handleDelete(studentId) {
        dispatch(removeStudent(studentId))
    }

    function ButtonArea() {
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

                <button className="btn btn-sm normal-case bg-green-700 text-white hover:bg-green-800">
                    Nhập từ excel <FontAwesomeIcon icon={faUpload} />
                </button>
            </div>
        )
    }

    return (
        <div>
            <TableList
                title="Danh sách sinh viên"
                headers={theadColumn}
                buttonArea={<ButtonArea />}
            >
                {students.map((student, index) => {
                    return (
                        <tr key={student.id}>
                            <th>{index + 1}</th>
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
                                <button
                                    className="btn btn-sm normal-case font-light bg-red-500 text-white hover:bg-red-600"
                                    onClick={() => handleDelete(student.id)}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </TableList>
        </div>
    )
}

export default Students
