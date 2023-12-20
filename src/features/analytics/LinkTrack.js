import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import ReactGA from "react-ga4"
const CustomTrackingLink = ({
  to,
  children,
  title = "",
  destination,
  customFunction
}) => {
  const history = useHistory()
  const location = useLocation()

  const trackDestination = () => {
    let currentPath = location.pathname
    customFunction && customFunction()
    ReactGA.send({
      hitType: "pageview",
      page: destination,
      title: title,
      from: currentPath,
      timeStamp: new Date()
    })

    history.push(to)
  }

  return (
    <div className="cursor-pointer" onClick={trackDestination}>
      {children}
    </div>
  )
}

export default CustomTrackingLink
