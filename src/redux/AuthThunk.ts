import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/LoginAPI";

interface LoginPayload {
  userName: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  firstName: string;
  lastName: string;
}

export const login = createAsyncThunk<
  LoginResponse,       
  LoginPayload,          
  { rejectValue: string } 
>(
  "auth/login",
  async ({ userName, password }, thunkAPI) => {
    try {
      const response = await api.post<LoginResponse>("/login", {
        username: userName,
        password: password,
      });

      const { accessToken, firstName, lastName } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
