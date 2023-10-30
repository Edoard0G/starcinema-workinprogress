import {configureStore} from "@reduxjs/toolkit"
import pagesReducer from "../component/films/pageSlice"
import userReducer from "../component/login/userSlice"


export const store = configureStore({
    reducer:{
        pages: pagesReducer,
        user: userReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch





