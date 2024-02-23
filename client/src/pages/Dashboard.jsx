import Calendar from '../components/Calendar'
import TodoList from '../components/TodoList'

function Dashboard() {
    const cards = [
        {
            title: 'Số lượng nhân viên',
            value: '150/150',
        },
        {
            title: 'Tỉ lệ qua môn',
            value: '82%',
        },
        {
            title: 'Điểm trung bình',
            value: '7.86',
        },
        {
            title: 'Số lượng sinh viên',
            value: '100/150',
        },
    ]
    return (
        <div>
            <p className="text-lg uppercase font-bold ml-4 mr-6 mt-6">Trang chủ-Super Admin</p>
            <div className="p-8">
                <div className="grid grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <div className="card bg-base-0 shadow-xl" key={index}>
                            <div className="card-body p-6">
                                <p>{card.title}</p>
                                <p className="text-3xl text-secondary font-bold">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex">
                <Calendar />
                <TodoList />
            </div>
        </div>
    )
}

export default Dashboard
