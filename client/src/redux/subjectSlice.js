import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSubjects = createAsyncThunk('subjects/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set, setTotal } = subjectSlice.actions
    const state = thunkAPI.getState()
    const { limit, page, search } = state.subjects

    const res = await axios.get(
        `http://localhost:3000/subjects?limit=${limit}&page=${page}&search=${search || ''}`
    )
    const data = res.data.subjects
    dispatch(setTotal(res.data.paging.total))
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
        limit: 10,
        page: 1,
        total: 0,
        search: '',
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

export default subjectSlice
