import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchStudents = createAsyncThunk('students/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set } = studentSlice.actions

    const res = await axios.get('http://localhost:3000/students')
    const data = res.data
    data.sort((std1, std2) => {
        if (std1.code < std2.code) return -1
        else if (std1.code > std2.code) return 1
        else return 0
    })
    dispatch(set(data))
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
    },
})

export default studentSlice
