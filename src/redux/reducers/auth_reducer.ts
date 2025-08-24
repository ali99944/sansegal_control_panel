import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../types/auth'
import { Manager } from '../../types/manager'

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  manager: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string
        manager: Manager
      }>
    ) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.manager = action.payload.manager
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.manager = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer