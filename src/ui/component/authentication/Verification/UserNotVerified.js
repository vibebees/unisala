import { useState } from "react"
import { IonButton, IonText, IonSpinner, useIonToast } from "@ionic/react"
import axios from "axios"
import urls from "../../../../utils/urls"
import "../auth.css"

export const UserNotVerified = ({ setauth, auth }) => {
  const { email } = auth
  const [present, dismiss] = useIonToast()
  const [save, setsave] = useState(false)

  const verify = () => {
    setsave(true)
    axios
      .post(urls["base"] + `/user/sendVerficationMail`, {
        email
      })
      .then((res) => {
        setsave(false)
        if (!res.data.success) {
          present({
            duration: 3000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
        }
        if (res.data.success) {
          present({
            duration: 3000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
          setauth({ state: "SignUpVerification" })
        }
      })
      .catch((err) => {
        setsave(false)
        present({
          duration: 3000,
          message: err.response.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      })
  }

  return (
    <div className="sign-content">
      <IonText className="ion-margin-bottom verify-dec">
        <p>Your account is not verified.</p>
      </IonText>

      <IonButton
        disabled={save}
        className="ion-margin-top"
        expand="full"
        shape="round"
        onClick={verify}
      >
        {save ? <IonSpinner></IonSpinner> : "Verify"}
      </IonButton>
    </div>
  )
}
export default UserNotVerified
