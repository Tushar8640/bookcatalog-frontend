import { IBook } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBookSlice {
  editBook: object;
}

const initialState: IBookSlice = {
  editBook: {},
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setToEdit: (state, action: PayloadAction<IBook>) => {
      state.editBook = action.payload;
    },
    removeFromEdit: (state, action: PayloadAction<IBook>) => {
      state.editBook = action.payload;
    },
  },
});

export const { setToEdit, removeFromEdit } = bookSlice.actions;

export default bookSlice.reducer;
