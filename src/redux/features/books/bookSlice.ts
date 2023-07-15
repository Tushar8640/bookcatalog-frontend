import { IBook } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBookSlice {
  editBook: IBook;
}

const initialState: IBookSlice = {
  editBook: {
    _id: 0,
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    reviews: 0,
    createdAt: "",
    updatedAt: "",
  },
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
