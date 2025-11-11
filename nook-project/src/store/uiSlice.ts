import { createSlice } from '@reduxjs/toolkit';

/**
 * UI State Interface
 * Manages all UI-related state (modals, sidebars, etc.)
 */
interface UIState {
  isCreatePostModalOpen: boolean;
  isEditProfileModalOpen: boolean;
  isSidebarOpen: boolean;
}

/**
 * Initial state for UI
 */
const initialState: UIState = {
  isCreatePostModalOpen: false,
  isEditProfileModalOpen: false,
  isSidebarOpen: false,
};

/**
 * UI Slice
 * Manages modals and other UI states
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Create Post Modal actions
     */
    openCreatePostModal: (state) => {
      state.isCreatePostModalOpen = true;
    },
    closeCreatePostModal: (state) => {
      state.isCreatePostModalOpen = false;
    },

    /**
     * Edit Profile Modal actions
     */
    openEditProfileModal: (state) => {
      state.isEditProfileModalOpen = true;
    },
    closeEditProfileModal: (state) => {
      state.isEditProfileModalOpen = false;
    },

    /**
     * Sidebar actions (for mobile)
     */
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const {
  openCreatePostModal,
  closeCreatePostModal,
  openEditProfileModal,
  closeEditProfileModal,
  toggleSidebar,
  closeSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;