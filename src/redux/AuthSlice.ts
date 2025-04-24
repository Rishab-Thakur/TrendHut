import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from 'jwt-decode';  
import { login } from "./AuthThunk";

interface DecodedToken {
  exp: number; 
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

const checkTokenValidity = (): boolean => {
  const token = localStorage.getItem("token");
  if (token && !isTokenExpired(token)) {
    return true;
  }
 
  localStorage.removeItem("token");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  return false;
};

interface AuthState {
  token: string | null;
  firstName: string | null;
  lastName: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  firstName: localStorage.getItem("firstName"),
  lastName: localStorage.getItem("lastName"),
  isAuthenticated: checkTokenValidity(),
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.firstName = null;
      state.lastName = null;
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("firstName", action.payload.firstName);
        localStorage.setItem("lastName", action.payload.lastName);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
