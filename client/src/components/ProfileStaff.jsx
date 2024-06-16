import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBriefcase, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfileStaff } from '../redux/staffSlice'

function ProfileStaff() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.staffs.profile)

    function getCookie(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
    }

    useEffect(() => {
        dispatch(fetchProfileStaff())
        const token = getCookie('token')
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <div className="navbar-end">
            <p>
                Xin chào <span className="font-bold">{profile.fullname} !</span>
            </p>
            <div className="avatar dropdown dropdown-end">
                <button tabIndex={0} role="button" className="btn btn-ghost btn-circle ml-1">
                    <FontAwesomeIcon icon={faUser} className="h-5" />
                </button>
                <div
                    tabIndex={0}
                    className="dropdown-content z-[1] card card-compact w-72 p-2 shadow bg-white text-black"
                >
                    <div className="card-body">
                        <h3 className="card-title">{profile.fullname}</h3>
                        <div className="divider mt-0"></div>
                        <p>
                            {' '}
                            <FontAwesomeIcon icon={faBriefcase} className="mr-1" /> Chức vụ:{' '}
                            {profile.role}
                        </p>
                        <p>
                            {' '}
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Email: {profile.email}
                        </p>
                        <p>
                            {' '}
                            <FontAwesomeIcon icon={faPhone} className="mr-2" />
                            SĐT: {profile.phoneNumber}
                        </p>{' '}
                        <br />
                        <button
                            className="btn btn-outline btn-primary"
                            onClick={() => navigate('/logout')}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>

            <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <FontAwesomeIcon icon={faBell} className="h-5" />
                </div>
            </button>
        </div>
    )
}

export default ProfileStaff
