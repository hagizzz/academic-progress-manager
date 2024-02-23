import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'react-router-dom'

function Login() {
    function handleClick() {
        redirect('/')
    }

    return (
        <div className="min-h-screen items-center flex">
            <div className="card w-96 bg-base-300 shadow-xl my-0 mx-auto">
                <figure className="px-10 pt-10">
                    <h1 className="card-title">Khoa Toán - Tin học</h1>
                </figure>
                <div className="card-body">
                    <p className=""> Tên đăng nhập: </p>
                    <input
                        type="text"
                        placeholder="Nhập tên đăng nhập..."
                        className="input input-bordered w-full max-w-xs mb-3"
                    />
                    <span>Mật khẩu: </span>
                    <input
                        type="text"
                        placeholder="Nhập mật khẩu..."
                        className="input input-bordered w-full max-w-xs"
                    />
                    <div className="card-actions">
                        <button className="btn btn-primary my-0 mx-auto mt-4" onClick={handleClick}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
