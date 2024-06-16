import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStaffs, removeStaff } from '../redux/staffSlice'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Form from '../components/Form'
import axios from 'axios'
import staffSlice from '../redux/staffSlice'
import TableList from '../components/TableList'
axios.defaults.withCredentials = true

function Staffs() {
    const theadColumn = ['Tên nhân viên', 'Email', 'Loại nhân viên', 'Trạng thái', 'Thao tác']
    const dispatch = useDispatch()
    const { add, setPage, setSearch } = staffSlice.actions
    const { staffs, page, limit, total, search } = useSelector((state) => state.staffs)
    const isStart = page == 1
    const isEnd = page * limit >= total

    useEffect(() => {
        dispatch(fetchStaffs())
    }, [search, page])

    async function addNewUserHandler(formInfo) {
        const res = await axios.post('http://localhost:3000/staffs', formInfo)
        const data = res.data
        dispatch(add(data))
        document.getElementById('noti').showModal()
    }

    function handleDelete(staffId) {
        dispatch(removeStaff(staffId))
    }

    function previousPage() {
        dispatch(setPage(page - 1))
    }

    function nextPage() {
        dispatch(setPage(page + 1))
    }

    function ButtonArea() {
        return (
            <div>
                <div className="inline mr-1">
                    <button
                        className="btn btn-primary btn-sm normal-case"
                        onClick={() => document.getElementById('add-new-form').showModal()}
                    >
                        Cấp tài khoản
                    </button>
                    <Form
                        id="add-new-form"
                        form_title="Gửi email kích hoạt tài khoản"
                        form_content="Thông tin nhân viên"
                        btnLabel="Gửi"
                        fields={[
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
                    Nhập từ excel
                </button>
            </div>
        )
    }

    return (
        <div>
            <dialog id="noti" className="modal">
                <div className="modal-box">
                    <p className="py-4 font-bold text-lg">Đã gửi email thành công</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <TableList
                title="Danh sách nhân viên"
                headers={theadColumn}
                onSearch={(e) => {
                    dispatch(setSearch(e.target.value))
                }}
                placeholder={'Tìm kiếm nhân viên...'}
                buttonArea={<ButtonArea />}
            >
                {staffs.map((staff, index) => {
                    return (
                        <tr key={staff.id}>
                            <th>{staff.id}</th>
                            <td>{staff.fullname}</td>
                            <td>{staff.email}</td>
                            <td>{staff.role}</td>
                            <td>{staff.status ? 'Đã kích hoạt' : 'Chưa kích hoạt'}</td>
                            <td>
                                <button className="btn btn-sm normal-case font-light ">
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>{' '}
                                <button
                                    className="btn btn-sm normal-case font-light bg-red-500 text-white hover:bg-red-600"
                                    onClick={() => handleDelete(staff.id)}
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

export default Staffs
