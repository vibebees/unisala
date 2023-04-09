import { useEffect, useRef } from "react"
import { callSocket } from "../../../servers/endpoints"
import { Home } from "./Home"

export default function HomePage({ setPopup }) {
  const socket = useRef(null)
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
  return <Home setPopup={setPopup} />
}
