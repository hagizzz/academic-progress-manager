import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchStaffs = createAsyncThunk('staffs/fetch', async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const { set } = staffSlice.actions

    const res = await axios.get('http://localhost:3000/staffs')
    const data = res.data
    dispatch(set(data))
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
    },
})

export default staffSlice
