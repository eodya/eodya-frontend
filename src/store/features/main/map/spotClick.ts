import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show : false,
    up : false
};

const spotClick = createSlice({
    name : "spotClick",
    initialState,
    reducers : {
        spotHide : (state)=>{
            return ({...state,show : false})
        },
        spotShow : (state)=>{
            return ({...state,show : true})
        }
    }
});

export const {spotHide,spotShow} = spotClick.actions;

export default spotClick.reducer;