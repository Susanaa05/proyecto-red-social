import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Post Interface
 */
export interface Post {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  visitors: string[];
  tags?: string;
  location?: string;
}

/**
 * Posts State Interface
 */
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

/**
 * Initial state for posts
 */
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

/**
 * Posts Slice
 * Manages all posts data and operations
 */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    /**
     * Set initial posts (load from JSON or API)
     */
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },

    /**
     * Add a new post
     */
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // Add to the beginning
    },

    /**
     * Update an existing post
     */
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },

    /**
     * Delete a post
     */
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },

    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Set error state
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setLoading,
  setError,
} = postsSlice.actions;

export default postsSlice.reducer;