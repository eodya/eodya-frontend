import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateType } from "../../../@types/main/marker/MarkerType";

export const getMarker = createAsyncThunk("get/marker",async(token : string)=>{

    const response = await axios.get('/api/v1/place/all?tag=벚꽃',{
        headers : {
            Authorization : token
        }
    });

    const {data} = response;
    
    return data;

});

export const getBookMarker = createAsyncThunk("get/bookmarker",async(token : string)=>{

    const response = await axios.get('/api/v1/place/all?tag=벚꽃',{
        headers : {
            Authorization : token
        }
    });
    const {data} = response;
    console.log(data);
    return data;

});

const initialState : initialStateType = {
    loading : true,
    markers : [],
    error : false
};

const mainMarker = createSlice({
    name : "mainMarker",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getMarker.pending,(state)=>{
            state.loading = false;
        })
        .addCase(getMarker.fulfilled,(state,action)=>{
            state.markers = action.payload;
        })
        .addCase(getMarker.rejected,(state)=>{
            state.error = true;
        })
        .addCase(getBookMarker.pending,(state)=>{
            state.loading = false;
        })
        .addCase(getBookMarker.fulfilled,(state,action)=>{
            state.markers = action.payload;
        })
        .addCase(getBookMarker.rejected,(state)=>{
            state.error = true;
        })
    }
});

export default mainMarker.reducer;