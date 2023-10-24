import { useSelector } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"

function ProtectedRoute({ children }) {
  const { loggedIn } = useSelector((state) => state?.userProfile || {})
  const location = useLocation()

  const [_, route, id] = location.pathname.split("/")

  const allowedRoutes = ["thread", "login", "roadmap", "university"]

  // Check if the route is in the allowedRoutes array and user is not logged in
  if (!loggedIn && allowedRoutes.includes(route)) {
    if (route === "thread" && id) {
      return children
    }
    return children
  }

  if (!loggedIn) {
    return <Redirect to="/" />
  }
  return children
}

export default ProtectedRoute
