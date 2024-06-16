import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/img/Logo-Math-CS-cyan-192.png'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Dashboard from '../pages/Dashboard'

axios.defaults.withCredentials = true

function LoginForm() {
    //const dispatch = useDispatch()
    //const { add } = staffSlice.actions
    const navigate = useNavigate()

    const inputFields = [
        {
            title: 'Email: ',
            type: 'text',
            name: 'email',
            label: 'Email: ',
            placeholder: 'Nhập email...',
        },
        {
            title: 'Mật khẩu: ',
            type: 'password',
            name: 'password',
            label: 'Mật khẩu: ',
            placeholder: 'Nhập mật khẩu...',
        },
    ]

    const [formInfo, setFormInfo] = useState({
        email: '',
        password: '',
    })

    async function loginHandler(e) {
        const res = await axios.post('http://localhost:3000/auth/login', formInfo)
        if (res?.data?.token) {
            navigate('/dashboard')
        }
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
        <div className="min-h-screen items-center flex">
            <div className="card w-96 bg-base-200 shadow-xl my-0 mx-auto">
                <img
                    src={Logo}
                    alt="Logo Khoa toán - tin học"
                    className="w-32 my-0 mx-auto mt-10"
                />
                <figure className="px-10 py-3">
                    <h1 className="card-title text-sky-500">Khoa Toán - Tin học</h1>
                </figure>
                <div className="card-body">
                    {inputFields.map((inputField, index) => {
                        return (
                            <div key={index}>
                                <span>{inputField.title}</span>
                                <input
                                    type={inputField.typeInput}
                                    placeholder={inputField.placeholder}
                                    className="input input-bordered w-full max-w-xs mb-3"
                                    value={formInfo[inputField.name]}
                                    onChange={fieldChangeHandler(inputField.name)}
                                />
                            </div>
                        )
                    })}

                    <div className="form-control flex-row justify-between">
                        <label className="label cursor-pointer justify-start">
                            <span className="label-text pr-2">Remember me</span>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox checkbox-primary w-4 h-4"
                            />
                        </label>
                        <a className="label link text-sm">Quên mật khẩu?</a>
                    </div>
                    <div className="card-actions">
                        <input
                            type="submit"
                            value="Đăng nhập"
                            className="btn btn-primary my-0 mx-auto mt-4 w-full"
                            onClick={loginHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
