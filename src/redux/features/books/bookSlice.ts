import { IBook } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBookSlice {
  editBook: IBook;
}

const initialState: IBookSlice = {
  editBook: {
    _id: "",
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    reviews:[],
    createdAt: "",
    updatedAt: "",
    addedBy:""
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
