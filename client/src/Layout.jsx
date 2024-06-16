import Home from './components/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Staffs from './pages/Staffs.jsx'
import Students from './pages/Students/Students.jsx'
import Login from './pages/Login.jsx'
import Subjects from './pages/Subjects/Subjects.jsx'
import StudentGrades from './pages/Students/StudentGrades.jsx'
import Courses from './pages/Subjects/Courses.jsx'
import Statistics from './pages/Statistics/Statistics.jsx'
import Setting from './pages/Setting/Setting.jsx'
import Logout from './pages/Logout/logout.jsx'

function Layout() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="staffs" element={<Staffs />} />
                    <Route path="students">
                        <Route path="info-management" element={<Students />} />
                        <Route path="grade" element={<StudentGrades />} />
                        <Route path="grade/:courseId" element={<StudentGrades />} />
                    </Route>

                    <Route path="subjects">
                        <Route path="list-subjects" element={<Subjects />} />
                        <Route path="course" element={<Courses />} />
                    </Route>
                    <Route path="statistics/:courseId" element={<Statistics />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="logout" element={<Logout />} />
                </Route>

                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Layout
