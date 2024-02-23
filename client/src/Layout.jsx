import NavBar from './components/NavBar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Staffs from './pages/Staffs.jsx'
import Students from './pages/Students/Students.jsx'
import Login from './pages/Login.jsx'
import Subjects from './pages/Subjects/Subjects.jsx'
import StudentGrades from './pages/Students/StudentGrades.jsx'
import Courses from './pages/Subjects/Courses.jsx'
import Statistics from './pages/Statistics/Statistics.jsx'

function Layout() {
    return (
        <BrowserRouter>
            <NavBar>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/staffs" element={<Staffs />} />
                    <Route path="/students">
                        <Route path="/students/info-management" element={<Students />} />
                        <Route path="/students/grade" element={<StudentGrades />} />
                    </Route>

                    <Route path="/subjects">
                        <Route path="/subjects/list-subjects" element={<Subjects />} />
                        <Route path="/subjects/course" element={<Courses />} />
                    </Route>
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </NavBar>
        </BrowserRouter>
    )
}

export default Layout
