import { createSlice } from '@reduxjs/toolkit'

// Check localStorage for initial theme, default to 'dark'
const initialTheme = localStorage.getItem('theme') || 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: initialTheme
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.mode)
    },
    setTheme: (state, action) => {
      state.mode = action.payload
      localStorage.setItem('theme', state.mode)
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
