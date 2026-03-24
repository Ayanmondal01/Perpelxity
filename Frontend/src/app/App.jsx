import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../features/auth/hook/useAuth"
import { useEffect } from "react"
import { useSelector } from "react-redux"

function App() {
  const auth = useAuth()
  const themeMode = useSelector(state => state.theme.mode)

  useEffect(() => {
    auth.handleGetMe()
  }, [])

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeMode])

  return (
    <RouterProvider router={router} />
  )
}

export default App