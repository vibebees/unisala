import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

function ProtectedRoute({ children }) {
  const { loggedIn } = useSelector((state) => state?.userProfile)
  return loggedIn ? children : <Redirect to="/home" />
}

export default ProtectedRoute
