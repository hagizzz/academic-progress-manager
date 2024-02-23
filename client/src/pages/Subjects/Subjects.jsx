import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubjects, removeSubject } from '../../redux/subjectSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrashCan, faUpload } from '@fortawesome/free-solid-svg-icons'
import TableList from '../../components/TableList'
import Form from '../../components/Form'
import subjectSlice from '../../redux/subjectSlice'
import axios from 'axios'

function Subjects() {
    const theadColumn = ['Mã môn học', 'Tên môn học', 'Thao tác']
    const dispatch = useDispatch()
    const subjects = useSelector((state) => state.subjects.subjects)
    const { add } = subjectSlice.actions

    useEffect(() => {
        dispatch(fetchSubjects())
    }, [])

    async function addNewSubjectHandler(formInfo) {
        const res = await axios.post('http://localhost:3000/subjects', formInfo)
        const data = res.data
        dispatch(add(data))
    }

    function handleDelete(subjectId) {
        dispatch(removeSubject(subjectId))
    }

    function ButtonArea() {
        return (
            <div>
                <div className="inline mr-1">
                    <button
                        className="btn btn-primary btn-sm normal-case text-white"
                        onClick={() => document.getElementById('add-new-form').showModal()}
                    >
                        Thêm môn học <FontAwesomeIcon icon={faPlus} />
                    </button>

                    <Form
                        id="add-new-form"
                        form_title="Thêm môn học mới"
                        form_content="Thông tin môn học"
                        fields={[
                            {
                                type: 'text',
                                name: 'code',
                                label: 'Mã môn học: ',
                                placeholder: 'Nhập mã môn học...',
                            },
                            {
                                type: 'text',
                                name: 'name',
                                label: 'Tên môn học: ',
                                placeholder: 'Nhập tên môn học...',
                            },
                        ]}
                        onSubmit={addNewSubjectHandler}
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
            <TableList title="Danh sách môn học" headers={theadColumn} buttonArea={<ButtonArea />}>
                {subjects.map((subject, index) => {
                    return (
                        <tr key={subject.id}>
                            <th>{index + 1}</th>
                            <td>{subject.code}</td>
                            <td>{subject.name}</td>
                            <td>
                                <button className="btn btn-sm normal-case font-light ">
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>{' '}
                                <button
                                    className="btn btn-sm normal-case font-light bg-red-500 text-white hover:bg-red-600"
                                    onClick={() => handleDelete(subject.id)}
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

export default Subjects
