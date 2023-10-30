import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import "../../const"
import { UserType } from "../../types/types";
import { Role } from "../../const";
const initialState:UserType = { username:null,email:null,userId:null,role:Role.GUEST };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
      SingIn:(state, action: PayloadAction<{username:string,userId:string,email:string,role:number}>) => {
        state.username = action.payload.username
        state.userId = action.payload.userId
        state.email = action.payload.email
        state.role = action.payload.role
        },
      SingOut:(state) => {
        state.username = null
        state.userId = null
        state.email = null
        state.role = Role.GUEST
        },
    
   
  },
});

export const selectUser = (state:RootState) => state.user;

export const { SingIn, SingOut } = userSlice.actions;

export default userSlice.reducer;
