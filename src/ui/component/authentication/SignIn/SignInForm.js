// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import "../auth.css"
import { IonButton, IonSpinner, IonRow, useIonToast } from "@ionic/react"
import { Link } from "react-router-dom"
import AuthInput from "../AuthInput"
import axios from "axios"
import urls from "../../../../utils/urls"

export const SignUpForm = ({ setauth }) => {
    const [errors, seterrors] = useState({})
    const [datacheck, setdatacheck] = useState(false)
    const [present, dismiss] = useIonToast()

    const [save, setsave] = useState(false)

    const [input, setInput] = useState({
        email: "",
        password: ""
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
        if (
            !data.email.match(
                /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
            )
        ) {
            errors.email = "Invalid email address."
            // error = false;
        }
        if (!data.password) {
            errors.password = "Password field is required"
        } else if (
            !data.password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
            )
        ) {
            errors.password =
                "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
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
                .post(urls["base"] + `/user/login`, input)
                .then((res) => {
                    setsave(false)
                    // setMessage("User saved sucessfully")
                    // setOpen(true)
                    if (res.data.success === true) {
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
                    present({
                        duration: 200000,
                        message: err.response.data.message,
                        buttons: [{ text: "X", handler: () => dismiss() }],
                        color: "primary",
                        mode: "ios"
                    })
                    setdatacheck(false)
                })
        }
    }, [errors])
    return (
        <form onSubmit={submitHandler}>
            <div className="auth-input-div">
                <label className="auth-label">Email</label>
                <br />
                <AuthInput
                    validation={errors?.email}
                    HandleChange={HandleChange}
                    type="text"
                    name="email"
                    value={input?.email}
                />
            </div>
            <div className="auth-input-div">
                <label className="auth-label">Password</label>
                <br />
                <AuthInput
                    validation={errors?.password}
                    HandleChange={HandleChange}
                    type="password"
                    name="password"
                    value={input?.password}
                />
            </div>
            <div className="auth-policy">
                <Link to="">Forget Password?</Link>
            </div>
            <IonButton
                disabled={save}
                type="submit"
                expand="full"
                shape="round"
            >
                {save ? <IonSpinner></IonSpinner> : "Login"}
            </IonButton>
            <IonRow className="auth-change">
                <p>Not Registered Yet?</p>{" "}
                <a
                    onClick={() => {
                        setauth("signup")
                    }}
                >
                    {" "}
                    Create an account
                </a>
            </IonRow>
        </form>
    )
}
export default SignUpForm
