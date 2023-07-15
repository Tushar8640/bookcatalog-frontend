import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user: {
    token: string | null;
  };
  isLoading: boolean;
}

const initialState: IUserState = {
  user: {
    token: null,
  },
  isLoading: false,
};

const authSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.token = action?.payload?.token;
    },
    logOut: (state) => {
      state.user.token = null;
      localStorage.removeItem("auth");
    },
    setIsLoading: (state,action) => {
      state.isLoading = action.payload;
     
    },
  },
});

export const { setUser, logOut,setIsLoading } = authSlice.actions;

export default authSlice.reducer;
