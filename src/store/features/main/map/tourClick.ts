import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show : true,
    up : false
};

const tourListClick = createSlice({
    name : "tourListClick",
    initialState,
    reducers : {
        upClick : (state)=>{
            return ({...state,up : true})
        },
        prevClick : (state)=>{
            return ({...state,up : false})
        },
        hide : (state)=>{
            return ({...state,show : false})
        },
        show : (state)=>{
            return ({...state,show : true})
        }
    }
});

export const {upClick,prevClick,hide,show} = tourListClick.actions;

export default tourListClick.reducer;