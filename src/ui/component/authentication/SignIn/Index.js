// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonText } from "@ionic/react"
import "../auth.css"
import GoogleAuth from "../GoogleAuth"
import SignInForm from "./SignInForm"
import AppleAuth from "../AppleAuth"

export const SignIn = ({ setauth }) => {
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
            <SignInForm setauth={setauth} />
        </div>
    )
}
export default SignIn
