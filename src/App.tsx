import ProtectedRoute from "./components/layout/ProtectedRoute"
import HomePage from "./pages/Home"

function App() {

  return (
    <ProtectedRoute>
    <HomePage></HomePage>
    </ProtectedRoute>
  )
}

export default App
