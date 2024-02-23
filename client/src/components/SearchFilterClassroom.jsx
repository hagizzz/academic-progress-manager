import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClassrooms } from '../redux/classroomSlice'

function SearchFilterClassroom() {
    const classrooms = useSelector((state) => state.classrooms.classrooms)
    const dispatch = useDispatch()
    const [searchItem, setSearchItem] = useState('')
    const [filteredClassrooms, setFilteredClassrooms] = useState(classrooms)

    useEffect(() => {
        dispatch(fetchClassrooms())
    }, [])

    const handleInputChange = (e) => {
        const searchTerm = e.target.value
        setSearchItem(searchTerm)

        const filteredClassrooms = classrooms.filter((classroom) =>
            classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredClassrooms(filteredClassrooms)
    }

    return (
        <div className="dropdown dropdown-bottom h-10">
            <div tabIndex={0}>
                <input
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder="Nhập để tìm kiếm..."
                    className="input input-bordered w-full max-w-xs h-8 mb-2 />"
                />
                {/* <FontAwesomeIcon icon={faClose} /> */}
            </div>
            <div tabIndex={0}>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 overflow-y-scroll h-52 flex-row rounded-box">
                    {filteredClassrooms.map((classroom) => (
                        <li key={classroom.id}>
                            <button>{classroom.code}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchFilterClassroom
