import { useState, useEffect } from "react"
import { IonButton, IonSpinner, IonRow, useIonToast } from "@ionic/react"

import AuthInput from "../AuthInput"
import { userServer } from "../../../../servers/endpoints"
import { validateSignIn } from "../../../../utils/components/validate"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../../store/action/authenticationAction"
import { useHistory } from "react-router"

const SignInForm = ({ setauth }) => {
  const [input, setInput] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [present] = useIonToast()
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
    // Clear the error for the current input field when the user starts correcting it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateSignIn(input)
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true)
      // Dispatch the loginUser action with appropriate arguments
      dispatch(loginUser({ input, history, setLoading, present }))
    } else {
      setErrors(validationErrors)
    }
  }

  // Handling the toast notification for login status
  useEffect(() => {
    if (loading) {
      present({
        message: "Logging in...",
        duration: 2000
      })
    }
  }, [loading, present])

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-input-div">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
          HandleChange={handleChange}
          type="text"
          name="email"
          value={input?.email}
          validation={errors?.email}
        />
      </div>
      <div className="auth-input-div">
        <label className="auth-label">Password</label>
        <br />
        <AuthInput
          HandleChange={handleChange}
          type="password"
          name="password"
          value={input?.password}
          validation={errors?.password}
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
      <button
        disabled={loading}
        type="submit"
        onSubmit={handleSubmit}
        className="block text-center bg-blue-600 w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide py-2 text-opacity-90 hover:opacity-90"
      >
        {loading ? <IonSpinner></IonSpinner> : "Login"}
      </button>
      {location.pathname !== "/" && (
        <IonRow
          onClick={() => {
            setauth({ state: "signup" })
          }}
          className="auth-change mt-8 inline-flex "
        >
          <p className="text-blue-600 font-medium text-lg">
            Not Registered Yet?{" "}
            <span className="underline underline-offset-4"> Click Here</span>
          </p>
        </IonRow>
      )}
    </form>
  )
}
export default SignInForm
