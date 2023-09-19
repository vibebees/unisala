import { useSelector } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"

function ProtectedRoute({ children }) {
  const { loggedIn } = useSelector((state) => state?.userProfile)
  const location = useLocation()
  // eslint-disable-next-line prefer-destructuring
  const id = location.pathname.split("/")[2]

  if (!loggedIn && location.pathname === `/thread/${id}`) {
    return children
  }

  if (!loggedIn) {
    return <Redirect to="/" />
  }

  return children
}

export default ProtectedRoute
