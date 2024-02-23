import { configureStore } from '@reduxjs/toolkit'
import staffSlice from './staffSlice'
import studentSlice from './studentSlice'
import subjectSlice from './subjectSlice'
import courseSlice from './courseSlice'
import classroomSlice from './classroomSlice'
const store = configureStore({
    reducer: {
        staffs: staffSlice.reducer,
        students: studentSlice.reducer,
        subjects: subjectSlice.reducer,
        courses: courseSlice.reducer,
        classrooms: classroomSlice.reducer,
    },
})

export default store
