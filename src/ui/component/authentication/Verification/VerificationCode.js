import { IonButton, IonText, IonSpinner, useIonToast } from "@ionic/react"
import axios from "axios"
import urls from "../../../../servers"
import AuthInput from "../AuthInput"
import "../auth.css"

const VerificationCode = ({ verify, email, loading, HandleChange, input }) => {
  const [present, dismiss] = useIonToast()

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const receiveCode = () => {
    axios
      .post(urls["base"] + `/user/sendVerficationMail`, { email })
      .then((res) => {
        if (res.data.success) {
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

  return (
    <form onSubmit={submitHandler} className="sign-content">
      <IonText className="ion-margin-bottom verify-dec">
        <p>
          Verification Code has been mailed to you. Wait for a few minutes, it
          might take a while. Account get deprecated if not verified within a
          month.
        </p>
      </IonText>
      <div className="auth-input-div ion-margin-top">
        <label className="auth-label">Verification Code</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="text"
          name="verificationCode"
          value={input?.verificationCode}
        />
      </div>
      <IonButton
        disabled={loading}
        type="submit"
        className="ion-margin-top"
        expand="full"
        shape="round"
        onClick={verify}
      >
        {loading ? <IonSpinner></IonSpinner> : "Next"}
      </IonButton>
      <IonText color="primary" className="auth-change">
        <p
          onClick={() => {
            receiveCode()
          }}
        >
          Didn’t receive a code?
        </p>
      </IonText>
    </form>
  )
}
export default VerificationCode
