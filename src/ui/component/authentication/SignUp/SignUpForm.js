import { useState, useEffect } from "react"
import "../auth.css"
import { IonButton, IonRow, IonSpinner, useIonToast } from "@ionic/react"
import { Link } from "react-router-dom"
import AuthInput from "../AuthInput"
import axios from "axios"
import validate from "../../../../utils/components/validate"
let url = require("../../../../servers")

export const SignUpForm = ({ setauth }) => {
  const [errors, seterrors] = useState({})
  const [present, dismiss] = useIonToast()
  const [datacheck, setdatacheck] = useState(false)
  const [save, setsave] = useState(false)

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
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
  const submitHandler = (e) => {
    e.preventDefault()
    seterrors(validate(input))
    setdatacheck(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && datacheck) {
      setsave(true)
      axios
        .post(url["base"] + `/user/register`, input)
        .then((res) => {
          setsave(false)
          if (res.data.success === true) {
            localStorage.setItem("email", input.email)
            setdatacheck(false)
            setauth({ state: "SignUpVerification" })
          }
          if (res.data.success === false) {
            present({
              duration: 3000,
              message: res.data.message,
              buttons: [{ text: "X", handler: () => dismiss() }],
              color: "primary",
              mode: "ios"
            })
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
          setdatacheck(false)
        })
    }
  }, [errors])

  return (
    <form onSubmit={submitHandler}>
      <div className="auth-name">
        <div>
          <label className="auth-label">First name</label>
          <AuthInput
            validation={errors?.firstName}
            type="text"
            name="firstName"
            value={input?.firstName}
            HandleChange={HandleChange}
          />
        </div>
        <div>
          <label className="auth-label">Last name</label>
          <AuthInput
            validation={errors?.lastName}
            HandleChange={HandleChange}
            type="text"
            name="lastName"
            value={input?.lastName}
          />
        </div>
      </div>
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
        <p
          style={{ color: "#3880ff", cursor: "pointer" }}
          onClick={() => {
            setauth({ state: "emailVerify" })
          }}
        >
          Forgot Password?
        </p>
      </div>
      <IonButton disabled={save} type="submit" expand="full" shape="round">
        {save ? <IonSpinner></IonSpinner> : "Register"}
      </IonButton>
      <IonRow className="auth-change inline-flex">
        <p>Already a member?</p>
        <a
          onClick={() => {
            setauth({ state: "signin" })
          }}
        >
          sign in
        </a>
      </IonRow>
    </form>
  )
}
export default SignUpForm
