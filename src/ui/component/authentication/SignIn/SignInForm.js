import { useState } from "react"
import "../auth.css"
import { IonButton, IonSpinner, IonRow, useIonToast } from "@ionic/react"
import AuthInput from "../AuthInput"
import axios from "axios"
import urls from "../../../../servers"

export const SignUpForm = ({ setauth }) => {
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    email: "",
    password: ""
  })
  const HandleChange = (e) => {
    const { name, value } = e.target
    setInput((pre) => {
      return { ...pre, [name]: value }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const login = () => {
    if (!input.email && !input.password) {
      return present({
        duration: 3000,
        message: "Empty fields!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }

    setLoading(true)
    axios
      .post(urls["base"] + `/user/login`, input)
      .then((res) => {
        setLoading(false)
        if (res.data.success) {
          localStorage.setItem("accessToken", res?.data.accessToken)
          localStorage.setItem("refreshToken", res?.data.refreshToken)
          window.location.reload()
        }
        if (!res.data.success) {
          present({
            duration: 3000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
          if (res.data.status === 302) {
            setauth({ state: "userNotVerified", email: input.email })
          }
        }
      })
      .catch((err) => {
        setLoading(false)
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
    <form onSubmit={submitHandler}>
      <div className="auth-input-div">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
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
      <IonButton
        disabled={loading}
        type="submit"
        expand="full"
        shape="round"
        onClick={login}
      >
        {loading ? <IonSpinner></IonSpinner> : "Login"}
      </IonButton>
      <IonRow className="auth-change inline-flex">
        <p>Not Registered Yet?</p>
        <a
          onClick={() => {
            setauth({ state: "signup" })
          }}
        >
          Create an account
        </a>
      </IonRow>
    </form>
  )
}
export default SignUpForm
