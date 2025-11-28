import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Auth State Interface
 */
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    firstName: string;
    userName: string;
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

    /**
     * 🔥 NUEVO: Set user from Supabase session
     * Para cuando el SessionChecker detecta una sesión activa
     */
    setUserFromSession: (state, action: PayloadAction<{
      id: string;
      email: string;
      // Puedes agregar más campos si Supabase los provee
    }>) => {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        firstName: action.payload.email?.split('@')[0] || 'User',
        userName: action.payload.email?.split('@')[0] || 'user',
        location: 'Unknown',
        avatar: 'https://i.pravatar.cc/150'
      };
    },

    /**
     * 🔥 NUEVO: Clear session - Para cuando Supabase no tiene sesión
     */
    clearSession: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Exporta las nuevas acciones también
export const { 
  login, 
  logout, 
  updateProfile, 
  updateUsername,
  setUserFromSession,  // ← NUEVO
  clearSession         // ← NUEVO
} = authSlice.actions;

export default authSlice.reducer;