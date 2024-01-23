import React from "react"
import { IonButton, useIonToast, IonSpinner } from "@ionic/react"
import { useMutation } from "@apollo/client"
import { RegisterUserEvent } from "graphql/user"
import { USER_SERVICE_GQL } from "servers/types"
import { useSelector } from "react-redux"

const RegisterButton = ({ eventId }) => {
  const { user } = useSelector((store) => store?.userProfile)
  const [present, dismiss] = useIonToast()
  const [RegisterUser, { loading }] = useMutation(RegisterUserEvent, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      userId: user._id,
      eventId
    },
    onCompleted: (data) => {
      console.log("data", data)
      // update uesr details in redux
      if (data?.editProfile?.status?.success) {
        present({
          duration: 3000,
          message: "Customizing your feed based on your profile!",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: data?.editProfile?.status?.message || "Something went wrong",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    },
    onError: (error) => {
      present({
        duration: 30000,
        message: error?.message || "Something went wrong",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const handleRegister = () => {
    RegisterUser()
  }

  return (
    <IonButton
      disabled={loading}
      expand="block"
      color={"primary"}
      onClick={handleRegister}
    >
      Register Now {loading && <IonSpinner name="lines"></IonSpinner>}
    </IonButton>
  )
}

export default RegisterButton
