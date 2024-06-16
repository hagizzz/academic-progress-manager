import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    function handleLogin() {
        if (!email || !password) {
            console.log('error')
        }
    }

    return <LoginForm />
}

export default Login
