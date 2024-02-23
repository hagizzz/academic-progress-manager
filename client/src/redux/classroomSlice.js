import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchClassrooms = createAsyncThunk('classrooms/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set } = classroomSlice.actions

    const res = await axios.get('http://localhost:3000/classrooms')
    const data = res.data
    dispatch(set(data))
})

// export const removeClassroom = createAsyncThunk('classrooms/remove', async (classroomId, thunkAPI) => {
//     const { dispatch } = thunkAPI
//     const { remove } = classroomSlice.actions
//     const res = await axios.delete(`http://localhost:3000/subjects/${courseId}`)
//     dispatch(remove(courseId))
// })

const classroomSlice = createSlice({
    name: 'classrooms',
    initialState: {
        classrooms: [],
    },
    reducers: {
        set(state, action) {
            state.classrooms = action.payload
        },
        add(state, action) {
            state.classrooms.push(action.payload)
        },
        // remove(state, action) {
        //     state.courses = state.courses.filter((course) => course.id != action.payload)
        // },
    },
})

export default classroomSlice
