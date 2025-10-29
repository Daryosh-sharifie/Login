import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ApiResponse {
  access_token: string;
}

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: "",
};

export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ApiResponse>(
        "https://saadbilal.free.beeceptor.com/login"
      );
      return response.data.access_token;
    } catch (error: any) {
      return rejectWithValue("API Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
