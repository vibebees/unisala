import React from "react"
import { useHistory, useLocation } from "react-router-dom"
const CustomTrackingLink = ({
  to,
  children,
  description = "",
  destination,
  customFunction
}) => {
  const history = useHistory()
  const location = useLocation()

  const trackDestination = () => {
    let currentPath = location.pathname
    customFunction && customFunction()
    let data = {
      from: currentPath,
      timeStamp: new Date().toISOString(),
      description: description,
      to: destination
    }

    console.log(data)

    history.push(to)
  }

  return (
    <div className="cursor-pointer" onClick={trackDestination}>
      {children}
    </div>
  )
}

export default CustomTrackingLink
