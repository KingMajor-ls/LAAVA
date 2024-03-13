import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  username: '',
//   view_posts: '',
};

// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;

