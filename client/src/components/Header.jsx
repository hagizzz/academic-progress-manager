import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ProfileStaff from './ProfileStaff'

axios.defaults.withCredentials = true

function Header(props) {
    return (
        <div className="navbar bg-base-200 sticky top-0 z-10 shadow-md">
            <div className="navbar-start">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="input w-full max-w-xs h-8"
                />
                <button className="btn btn-ghost btn-circle">
                    <FontAwesomeIcon icon={faSearch} className="h-5" />
                </button>
            </div>

            <ProfileStaff />
        </div>
    )
}

export default Header
