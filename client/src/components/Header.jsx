import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
    return (
        <div className="navbar bg-base-200 sticky top-0 z-10 shadow-md">
            <div className="navbar-start">
                {/* <span className="text-xl font-bold ml-11">{props.title}</span> */}
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="input w-full max-w-xs h-8"
                />
                <button className="btn btn-ghost btn-circle">
                    <FontAwesomeIcon icon={faSearch} className="h-5" />
                </button>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <FontAwesomeIcon icon={faBell} className="h-5" />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <div className="avatar online mx-2">
                    <div className="rounded-full h-8 mb-1">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
