import { useRef } from "react"
import { useIonToast } from "@ionic/react"

import "./auth.css"
import { useDispatch } from "react-redux"
import { googleAuthAction } from "store/action/authenticationAction"
import { useHistory } from "react-router"
import { useScript } from "hooks/useScript"

export const GoogleAuth = ({ setauth }) => {
  const [present, dismiss] = useIonToast()
  const googlebuttonref = useRef(),
    dispatch = useDispatch(),
    history = useHistory()

  const params = new URLSearchParams(window.location.search)

  const onGoogleSignIn = (user) => {
    const { credential } = user
    dispatch(
      googleAuthAction({
        present,
        dismiss,
        credential,
        redirectUrl: params.get("uni") + `?unitId=${params.get("unitId")}`
      })
    )
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
