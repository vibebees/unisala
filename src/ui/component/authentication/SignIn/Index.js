import { IonText } from "@ionic/react"
import GoogleAuth from "../GoogleAuth"
import SignInForm from "./SignInForm"
import AppleAuth from "../AppleAuth"
import "../auth.css"

export const SignIn = ({ setauth, setActiveNavDrop }) => {
  return (
    <div className="sign-content">
      <IonText className="auth-start">
        <h2>Sign in</h2>
      </IonText>
      <div className="auth-button">
        <div
          style={{
            width: "234px"
          }}
        >
          <GoogleAuth />
        </div>
      </div>
      <div className="auth-button">
        <AppleAuth />
      </div>

      <div className="auth-or">
        <p className="auth-or-p">or Sign in with Email!</p>
      </div>
      <SignInForm setauth={setauth} setActiveNavDrop={setActiveNavDrop} />
    </div>
  )
}
export default SignIn
