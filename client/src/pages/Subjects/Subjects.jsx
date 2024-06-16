import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubjects, removeSubject } from '../../redux/subjectSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrashCan, faUpload } from '@fortawesome/free-solid-svg-icons'
import TableList from '../../components/TableList'
import Form from '../../components/Form'
import subjectSlice from '../../redux/subjectSlice'
import axios from 'axios'

axios.defaults.withCredentials = true

function Subjects() {
    const theadColumn = [
        'Mã môn học',
        'Tên môn học',
        'Số tín chỉ',
        'Lý thuyết',
        'Thực hành-bt',
        'Thao tác',
    ]
    const dispatch = useDispatch()
    const { add, setPage, setSearch } = subjectSlice.actions
    const { subjects, page, limit, total, search } = useSelector((state) => state.subjects)
    const isStart = page == 1
    const isEnd = page * limit >= total

    useEffect(() => {
        dispatch(fetchSubjects())
    }, [search, page])

    async function addNewSubjectHandler(formInfo) {
        const res = await axios.post('http://localhost:3000/subjects', formInfo)
        const data = res.data
        dispatch(add(data))
    }

    function handleDelete(subjectId) {
        dispatch(removeSubject(subjectId))
        dispatch(fetchSubjects())
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
            formData.append('Mã môn học', Code)
            formData.append('Tên môn học', Name)
            formData.append('Số tín chỉ', Credit)
            formData.append('Lý thuyết', TheoryPeriodAmount)
            formData.append('Thực hành-bt', PracticePeriodAmount)

            try {
                let res = await axios.post(`http://localhost:3000/subjects/file`, formData)

                dispatch(fetchSubjects())
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
                        let res = await axios.post('http://localhost:3000/subjects/file', formData)
                        dispatch(fetchSubjects())
                    }}
                />
            </div>
        )
    }
    return (
        <div>
            <TableList
                title="Danh sách môn học"
                headers={theadColumn}
                onSearch={(e) => {
                    dispatch(setSearch(e.target.value))
                }}
                placeholder={'Tìm kiếm môn học...'}
                buttonArea={<ButtonArea />}
            >
                {subjects
                    // .filter((subject) => {
                    //     return search.toLowerCase() === ''
                    //         ? subject
                    //         : subject.name.toLowerCase().includes(search)
                    // })
                    .map((subject) => {
                        return (
                            <tr key={subject.id}>
                                <th>{subject.id}</th>
                                <td>{subject.code}</td>
                                <td>{subject.name}</td>
                                <td>{subject.credit}</td>
                                <td>{subject.theoryPeriodAmount}</td>
                                <td>{subject.practicePeriodAmount}</td>
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

export default Subjects
