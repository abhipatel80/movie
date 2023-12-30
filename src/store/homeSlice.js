import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: {},
    category: {}
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getapidata: (state, action) => {
            state.url = action.payload
        },
        getapicatedata: (state, action) => {
            state.category = action.payload
        },
    }
})

export const { getapidata, getapicatedata } = homeSlice.actions

export default homeSlice.reducer;
