import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

export const fetchStudents = createAsyncThunk('students/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set, setTotal } = studentSlice.actions
    const state = thunkAPI.getState()
    const { limit, page, search } = state.students

    const res = await axios.get(
        `http://localhost:3000/students?limit=${limit}&page=${page}&search=${search || ''}`
    )
    let students = res.data.students
    students.sort((std1, std2) => {
        if (std1.code < std2.code) return -1
        else if (std1.code > std2.code) return 1
        else return 0
    })
    dispatch(setTotal(res.data.paging.total))
    dispatch(set(students))
})

export const removeStudent = createAsyncThunk('students/remove', async (studentId, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { remove } = studentSlice.actions
    const res = await axios.delete(`http://localhost:3000/students/${studentId}`)
    dispatch(remove(studentId))
})

const studentSlice = createSlice({
    name: 'students',
    initialState: {
        students: [],
        limit: 10,
        page: 1,
        total: 0,
        search: '',
    },
    reducers: {
        set(state, action) {
            state.students = action.payload
        },
        add(state, action) {
            state.students.push(action.payload)
        },
        remove(state, action) {
            state.students = state.students.filter((student) => student.id != action.payload)
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

export default studentSlice
