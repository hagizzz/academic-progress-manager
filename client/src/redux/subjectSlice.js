import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSubjects = createAsyncThunk('subjects/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set } = subjectSlice.actions

    const res = await axios.get('http://localhost:3000/subjects')
    const data = res.data
    dispatch(set(data))
})

export const removeSubject = createAsyncThunk('subjects/remove', async (subjectId, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { remove } = subjectSlice.actions
    const res = await axios.delete(`http://localhost:3000/subjects/${subjectId}`)
    dispatch(remove(subjectId))
})

const subjectSlice = createSlice({
    name: 'subjects',
    initialState: {
        subjects: [],
    },
    reducers: {
        set(state, action) {
            state.subjects = action.payload
        },
        add(state, action) {
            state.subjects.push(action.payload)
        },
        remove(state, action) {
            state.subjects = state.subjects.filter((subject) => subject.id != action.payload)
        },
    },
})

export default subjectSlice
