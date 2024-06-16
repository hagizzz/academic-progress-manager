import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

export const fetchCourses = createAsyncThunk('courses/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set, setTotal, setSearch } = courseSlice.actions
    const state = thunkAPI.getState()
    const { limit, page, search } = state.courses

    const res = await axios.get(
        `http://localhost:3000/courses?limit=${limit}&page=${page}&search=${search || ''}`
    )
    let courses = res.data.courses
    dispatch(setTotal(res.data.paging.total))
    dispatch(set(courses))
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
        limit: 10,
        page: 1,
        total: 0,
        search: '',
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
        setPage(state, action) {
            state.page = action.payload
        },
        setTotal(state, action) {
            state.total = action.payload
        },
        setSearch(state, action) {
            state.search = action.payload
        },
    },
})

export default courseSlice
