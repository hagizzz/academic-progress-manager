import { useState } from 'react'

function TodoList() {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])

    return (
        <div className="card w-1/3 shadow-xl p-4">
            <p className="text-lg font-bold ml-4 mr-6 mt-6">Những việc cần làm</p>

            <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
            </ul>
        </div>
    )
}

export default TodoList
