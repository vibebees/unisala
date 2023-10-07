import {useEffect, useRef} from "react"
import {callSocket} from "../../../servers/endpoints"
import {Home} from "./template"
import {getAllPropsHome} from "./getAllProps"
import {useSelector} from "react-redux"
export default function HomePage({setPopup}) {
  const socket = useRef(null)
  const {user, loggedIn} = useSelector((store) => store?.userProfile || {})

  const allProps = getAllPropsHome({user, loggedIn})
  useEffect(() => {
    socket.current = callSocket()

    socket.current.on("connect", (msg) => {
      console.log("callSocket connected")
    })

    return () => {
      socket.current.disconnect()
      console.log("callSocket disconnected")
    }

  }, [])
  return <Home setPopup={setPopup} allProps={allProps} />
}
