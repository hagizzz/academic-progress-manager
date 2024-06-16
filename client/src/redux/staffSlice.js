import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchStaffs = createAsyncThunk('staffs/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set, setTotal } = staffSlice.actions
    const state = thunkAPI.getState()
    const { limit, page, search } = state.staffs

    const res = await axios.get(
        `http://localhost:3000/staffs?limit=${limit}&page=${page}&search=${search || ''}`
    )
    let staffs = res.data.staffs
    staffs.sort((st1, st2) => {
        if (st1.code < st2.code) return -1
        else if (st1.code > st2.code) return 1
        else return 0
    })
    dispatch(setTotal(res.data.paging.total))
    dispatch(set(staffs))
})

export const fetchProfileStaff = createAsyncThunk('staffs/profile/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { setProfile } = staffSlice.actions
    const res = await axios.get('http://localhost:3000/staffs/profile')
    dispatch(setProfile(res.data))
})

export const removeStaff = createAsyncThunk('staffs/remove', async (staffId, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { remove } = staffSlice.actions
    const res = await axios.delete(`http://localhost:3000/staffs/${staffId}`)
    dispatch(remove(staffId))
})

const staffSlice = createSlice({
    name: 'staffs',
    initialState: {
        staffs: [],
        profile: {},
        limit: 10,
        page: 1,
        total: 0,
        search: '',
    },
    reducers: {
        set(state, action) {
            state.staffs = action.payload
        },
        add(state, action) {
            state.staffs.push(action.payload)
        },
        remove(state, action) {
            state.staffs = state.staffs.filter((staff) => staff.id != action.payload)
        },
        setProfile(state, action) {
            state.profile = action.payload
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

export default staffSlice
