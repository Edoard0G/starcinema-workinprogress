import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import "../../const"
import { CONST } from "../../const";
import { PagesType } from "../../types/types";

const initialState:PagesType = { attuale: 1, totali: 1, classic: true };
const PageCalcolation = (len:number,mode:boolean) => {
  let dimPage = 1;
  if (mode) {
    dimPage = CONST.CLASSIC_MODE;
  } else {
    dimPage = CONST.ALTERNATIVE_MODE;
  }
  let numPage = ~~(len / dimPage);
  if (len % dimPage > 0) numPage++;
  return numPage;
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    updatePages:(state, action: PayloadAction<number>) => {
      state.totali = PageCalcolation(action.payload,state.classic)
      state.attuale = 1
      },
    changePages:(state, action: PayloadAction<number>) => {
        state.attuale = action.payload
      
    },
    changeMode:(state, action: PayloadAction<number>) => {
      state.classic = !state.classic;
      state.attuale = 1,
      state.totali = PageCalcolation(action.payload,state.classic)
    },
  },
});

export const selectPages = (state:RootState) => state.pages;

export const { updatePages, changePages, changeMode } = pagesSlice.actions;

export default pagesSlice.reducer;
