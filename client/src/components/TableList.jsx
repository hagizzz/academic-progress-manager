import StaffForm from '../components/StaffForm'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStaffs, removeStaff } from '../redux/staffSlice'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TableList(props) {
    return (
        <div className="card bg-base-100 shadow-xl mt-10 mx-8 p-6">
            <div className="">
                <span className="translate-y-1 inline-block text-xl font-bold">{props.title}</span>

                <div className="float-right">{props.buttonArea}</div>
            </div>

            <div className="divider"></div>

            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {props.headers.map((item, index) => {
                            return <th key={index}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>{props.children}</tbody>
            </table>
        </div>
    )
}

export default TableList
