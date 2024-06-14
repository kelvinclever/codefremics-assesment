import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import SucessMessage from "./successMessage";

const success = <SucessMessage message="login success" />;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
    loading: false,
    success: false,
  },
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = success;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

export const login = (data) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const response = await Axios.post("https://stemprotocol.codefremics.com/api/v2/users/login", {
      username: data.userName,
      password: data.password,
    });

    const userData = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      currency: response.data.currency,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      id: response.data.id,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    dispatch(loginSuccess(userData));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.description) {
      dispatch(loginFailure(error.response.data.description));
    } else {
      dispatch(loginFailure("An unexpected error occurred during login"));
    }
  }
};

export default userSlice.reducer;
