import { allowedRoutes } from "./protectedRoute"

export const CheckLoginRedirect = () => {
  const currentLocation = window.location.pathname
  console.log("Checking for login redirect")
  if (
    allowedRoutes.some((route) =>
      currentLocation.split("/").includes(route)
    ) === false
  ) {
    if (currentLocation === "/") {
      // eslint-disable-next-line no-useless-return
      return
    }

    window.location.assign("/login")
  }
}
