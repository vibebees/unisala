import { useRef } from "react"
import { useIonToast } from "@ionic/react"
import { useScript } from "../../../hooks/useScript"
import axios from "axios"
import urls from "../../../servers"
import { userServer } from "../../../servers/endpoints"
import "./auth.css"

export const GoogleAuth = () => {
  const [present, dismiss] = useIonToast()
  const googlebuttonref = useRef()
  const onGoogleSignIn = (user) => {
    const { credential } = user
    axios
      .post(userServer + `/auth/google`, { token: credential })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("accessToken", res?.data.accessToken)
          localStorage.setItem("refreshToken", res?.data.refreshToken)
          window.innerWidth < 768
            ? window.location.replace("/home")
            : window.location.reload()
        }
        if (!res.data.success) {
          present({
            duration: 3000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
        }
      })
  }

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "487917910098-28vlg3tsath5h6qgu8bvdlfnep20du3s.apps.googleusercontent.com", // here's your Google ID
      callback: onGoogleSignIn,
      auto_select: false
    })

    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "large",
      shape: "circle",
      theme: "outline"
    })
  })

  return <div ref={googlebuttonref} />
}
export default GoogleAuth
