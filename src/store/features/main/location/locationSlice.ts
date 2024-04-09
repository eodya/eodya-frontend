import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface locationType {
    nomarl: boolean;
    tour: boolean;
    info: boolean;
}

const initialState :locationType = {
    nomarl : false,
    tour : true,
    info : false
}

const locationSlice = createSlice({
    name : "location",
    initialState,
    reducers : {
        changeAction : (_,action : PayloadAction<locationType>) =>{
            return action.payload
        }
    }
});

export const {changeAction} = locationSlice.actions;

export default locationSlice.reducer;