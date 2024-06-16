import { useDispatch } from 'react-redux'
import subjectSlice from '../redux/subjectSlice'

function TableList(props) {
    const dispatch = useDispatch()
    const { setSearch } = subjectSlice.actions

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
                <tbody>
                    <tr>
                        <td colSpan={props.headers.length + 1}>
                            <input
                                type="text"
                                placeholder={props.placeholder}
                                className="input input-bordered w-full"
                                onChange={props.onSearch}
                            />
                        </td>
                    </tr>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}

export default TableList
