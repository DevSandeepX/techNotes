import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: (state) => {
      state.token = null
    },
  },
})

// Actions
export const { setCredentials, logOut } = authSlice.actions

// Reducer
export default authSlice.reducer

// Selector
export const selectCurrentToken = (state) => state.auth.token
