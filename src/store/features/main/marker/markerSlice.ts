import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MainMarkerType } from "../../../@types/main/marker/MarkerType";

export const getMarker = createAsyncThunk("get/marker",async(token : string)=>{

    const response = await axios.get('/api/v1/place/all?tag=벚꽃',{
        headers : {
            Authorization : token
        }
    });

    const {data} = response;
    
    return data;

});

const initialState : MainMarkerType = {
    loading : false,
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
            state.loading = true;
        })
        .addCase(getMarker.fulfilled,(state,action)=>{
            state.loading = false;
            state.markers = action.payload;
        })
        .addCase(getMarker.rejected,(state)=>{
            state.loading = false;
            state.error = true;
        })
    }
});

export default mainMarker.reducer;