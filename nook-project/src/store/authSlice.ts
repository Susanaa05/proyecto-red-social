import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Auth State Interface
 */
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    firstName: string;
    userName: string;  // ← ESTE es el campo importante
    location: string;
    avatar: string;
  } | null;
}

/**
 * Initial state for authentication
 */
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

/**
 * Auth Slice
 * Manages authentication state and user data
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Login action - Sets user as authenticated
     */
    login: (state, action: PayloadAction<AuthState['user']>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    /**
     * Logout action - Clears authentication
     */
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    /**
     * Update user profile - ESPECIALMENTE para username
     */
    updateProfile: (state, action: PayloadAction<Partial<AuthState['user']>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    /**
     * Update username específicamente
     */
    updateUsername: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.userName = action.payload;
      }
    },
  },
});

export const { login, logout, updateProfile, updateUsername } = authSlice.actions;
export default authSlice.reducer;