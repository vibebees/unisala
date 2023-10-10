import axios from "axios"
import { useRef } from "react"
import { useIonToast } from "@ionic/react"

import "./auth.css"
import { useScript } from "../../../hooks/useScript"
import { userServer } from "../../../servers/endpoints"

export const GoogleAuth = ({ setauth }) => {
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
          if (res?.data.isFirstLogin) {
            localStorage.setItem("newUser", "true")
            window.location.reload()
          } else {
            window.innerWidth < 768
              ? window.location.replace("/home")
              : window.location.reload()
          }
          window.reload()
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
        "1001592245381-rbpoecv2se6v3avlkisbbsfpl09cjfs4.apps.googleusercontent.com",
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
