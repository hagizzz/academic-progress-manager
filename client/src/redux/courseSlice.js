import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCourses = createAsyncThunk('courses/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set } = courseSlice.actions

    const res = await axios.get('http://localhost:3000/courses')
    const data = res.data
    dispatch(set(data))
})

export const removeCourse = createAsyncThunk('courses/remove', async (courseId, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { remove } = courseSlice.actions
    const res = await axios.delete(`http://localhost:3000/subjects/${courseId}`)
    dispatch(remove(courseId))
})

const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
    },
    reducers: {
        set(state, action) {
            state.courses = action.payload
        },
        add(state, action) {
            state.courses.push(action.payload)
        },
        remove(state, action) {
            state.courses = state.courses.filter((course) => course.id != action.payload)
        },
    },
})

export default courseSlice
