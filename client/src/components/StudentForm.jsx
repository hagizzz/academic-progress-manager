import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import studentSlice from '../redux/studentSlice'

function StudentForm() {
    const dispatch = useDispatch()
    const { add } = studentSlice.actions

    const inputFields = [
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
    ]

    const [formInfo, setFormInfo] = useState({
        fullname: '',
        email: '',
    })

    async function addNewUserHandler(e) {
        const res = await axios.post('http://localhost:3000/students', formInfo)
        const data = res.data
        dispatch(add(data))
    }

    function fieldChangeHandler(fieldName) {
        return (e) => {
            setFormInfo((preState) => {
                return {
                    ...preState,
                    [fieldName]: e.target.value,
                }
            })
        }
    }

    return (
        <dialog id="add-new-user-form" className="modal font-light">
            <div className="modal-box text-slate-700">
                <div className="flex flex-col w-full">
                    <p className="font-bold text-left text-2xl">Thêm người dùng mới</p>

                    <div className="divider"></div>

                    <div className="grid">
                        <p className="pb-5 text-lg">Thông tin người dùng</p>

                        <form method="dialog">
                            {inputFields.map((field, index) => {
                                return (
                                    <div className="w-full flex align-middle" key={index}>
                                        <label className="w-28 pt-2">{field.label}</label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="input w-full max-w-xs h-10 input-bordered mb-4"
                                            value={formInfo[field.name]}
                                            onChange={fieldChangeHandler(field.name)}
                                        />
                                    </div>
                                )
                            })}

                            <input
                                className="btn btn-primary"
                                type="submit"
                                onClick={addNewUserHandler}
                                placeholder="Thêm"
                            />
                        </form>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-circle  btn-sm  btn-ghost absolute right-2 top-2">
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default StudentForm
