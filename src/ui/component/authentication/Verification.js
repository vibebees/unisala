// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import { IonButton, IonText, IonSpinner } from "@ionic/react"
import "./auth.css"
import AuthInput from "./AuthInput"
import axios from "axios"
import urls from "../../../utils/urls"

export const Verification = ({ setauth }) => {
    const [errors, seterrors] = useState({})
    const [datacheck, setdatacheck] = useState(false)
    const [save, setsave] = useState(false)

    const [input, setInput] = useState({
        verificationCode: ""
    })
    const HandleChange = (e) => {
        const { name, value } = e.target
        setInput((pre) => {
            return { ...pre, [name]: value }
        })
        seterrors({
            ...errors,
            [name]: ""
        })
    }
    const validate = (data) => {
        const errors = {}
        if (!data.verificationCode) {
            errors.verificationCode = "Code field is required"
            // error = false;
        } else if (data.verificationCode.length < 6) {
            errors.verificationCode = "Code must me of at least six character"
        }
        seterrors(errors)
        return errors
    }
    const submitHandler = (e) => {
        e.preventDefault()
        seterrors(validate(input))
        setdatacheck(true)
    }
    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && datacheck) {
            setsave(true)
            axios
                .post(urls["base"] + `/verifyEmail`, {
                    ...input,
                    email: localStorage.getItem("email")
                })
                .then((res) => {
                    setsave(false)
                    // setMessage("User saved sucessfully")
                    // setOpen(true)
                    if (res.data.success === true) {
                        // localStorage.removeItem("email")
                        localStorage.setItem(
                            "accessToken",
                            res?.data.accessToken
                        )
                        localStorage.setItem(
                            "refreshToken",
                            res?.data.refreshToken
                        )
                        setdatacheck(false)
                        window.location.reload()
                    }
                })
                .catch((err) => {
                    setsave(false)
                    console.log(err)
                    setdatacheck(false)
                })
        }
    }, [errors])
    const receiveCode = () => {
        axios
            .post(urls["base"] + `/sendVerficationMail`, {
                email: localStorage.getItem("email")
            })
            .then((res) => {})
    }
    return (
        <form onSubmit={submitHandler} className="sign-content">
            <IonText className="ion-margin-bottom verify-dec">
                <p>
                    Verification Code has been mailed to you. Wait for a few
                    minutes, it might take a while. Account get deprecated if
                    not verified within a month.
                </p>
            </IonText>
            <div className="auth-input-div ion-margin-top">
                <label className="auth-label">Verification Code</label>
                <br />
                <AuthInput
                    validation={errors?.verificationCode}
                    HandleChange={HandleChange}
                    type="text"
                    name="verificationCode"
                    value={input?.verificationCode}
                />
            </div>
            <IonButton
                disabled={save}
                type="submit"
                className="ion-margin-top"
                expand="full"
                shape="round"
            >
                {save ? <IonSpinner></IonSpinner> : "Next"}
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
export default Verification
