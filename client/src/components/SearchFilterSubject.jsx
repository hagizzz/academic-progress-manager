import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubjects } from '../redux/subjectSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

function SearchFilterSubject() {
    const subjects = useSelector((state) => state.subjects.subjects)
    const dispatch = useDispatch()
    const [searchItem, setSearchItem] = useState('')
    const [filteredSubjects, setFilteredSubjects] = useState(subjects)

    useEffect(() => {
        dispatch(fetchSubjects())
    }, [])

    const handleInputChange = (e) => {
        const searchTerm = e.target.value
        setSearchItem(searchTerm)

        const filteredSubjects = subjects.filter((subject) =>
            subject.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredSubjects(filteredSubjects)
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
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 overflow-y-scroll h-52 overflow-x-hidden flex-row rounded-box">
                    {filteredSubjects.map((subject) => (
                        <li key={subject.id}>
                            <button>{subject.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchFilterSubject
