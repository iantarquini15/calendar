import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { uiSlice ,calendarSlice, AuthSlice} from "./";




export const store = configureStore({
    reducer: {
        ui:         uiSlice.reducer,
        calendar:   calendarSlice.reducer,
        auth:       AuthSlice.reducer
       
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
}) 