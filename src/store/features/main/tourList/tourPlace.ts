import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TourPlaceType } from "../../../@types/main/tourList/TourPlaceType";

const initialState :TourPlaceType = {
    loading : false,
    data : {
        placeDetails: [],
        hasNext: false
    },
    error : null,
}

export const getTourPlace = 
createAsyncThunk(
    "get/tourPlace",
    async ({token,address,page} : {token : string,address:string,page:number}
) =>{

    const response = await axios.post(`/api/v1/place/search?page=${page}&size=3`,{address : "서울"},{
        headers : {
            Authorization : token,
            "Content-Type" : "application/json",
        }
    });
    const {data} = response;
    return data;

});

const tourPlace = createSlice({
    name : "tourPlace",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getTourPlace.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getTourPlace.fulfilled,(state,action)=>{
            state.loading = false;
            state.data.placeDetails = [...state.data.placeDetails,...action.payload.placeDetails];
            state.data.hasNext = action.payload.hasNext;
        })
        .addCase(getTourPlace.rejected,(state)=>{
            state.loading = false;
            state.error = "error01";
        })
    },
});

export default tourPlace.reducer;