import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()

    function deleteAllCookies() {
        const cookies = document.cookie.split(';')

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i]
            const eqPos = cookie.indexOf('=')
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
    }

    useEffect(() => {
        deleteAllCookies()
        navigate('/login', { replace: true })
    }, [])
    return <div></div>
}

export default Logout
