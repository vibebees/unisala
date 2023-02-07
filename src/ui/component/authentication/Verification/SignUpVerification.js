import { useState } from "react"
import { useIonToast } from "@ionic/react"
import axios from "axios"
import urls from "../../../../utils/urls"
import VerificationCode from "./VerificationCode"
import "../auth.css"

const SignUpVerification = ({ setauth }) => {
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    verificationCode: ""
  })
  const HandleChange = (e) => {
    const { name, value } = e.target
    setInput((pre) => {
      return { ...pre, [name]: value }
    })
  }

  const verify = () => {
    if (input.verificationCode.length < 6) {
      return present({
        duration: 3000,
        message: "Invalid code!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
    setLoading(true)
    axios
      .post(urls["base"] + `/user/verifyEmail`, {
        ...input,
        email: localStorage.getItem("email")
      })
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          localStorage.setItem("accessToken", res?.data.accessToken)
          localStorage.setItem("refreshToken", res?.data.refreshToken)
          window.location.reload()
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
    <VerificationCode
      HandleChange={HandleChange}
      input={input}
      verify={verify}
      loading={loading}
    />
  )
}
export default SignUpVerification
