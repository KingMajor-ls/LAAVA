import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  username: '',
  userId: '',
  
};

// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUsername, setUserId } = authSlice.actions;

export default authSlice.reducer;
