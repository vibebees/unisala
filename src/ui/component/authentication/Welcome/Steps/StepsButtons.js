import React, { useContext, useState } from "react"
import { IonButton, useIonToast } from "@ionic/react"
import clsx from "clsx"
import { WelcomeData } from ".."
import { useDispatch, Provider } from "react-redux"
import { useMutation } from "@apollo/client"
import jwtDecode from "jwt-decode"
import { getUserProfile } from "../../../../../store/action/userProfile"
import { EditProfile, getUserGql } from "../../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

const StepsButtons = ({ currentStep, setCurrentStep }) => {
  const { mockWelcomedata, setWelcomeFormdata, welcomeFormdata } =
      useContext(WelcomeData),
    dispatch = useDispatch(),
    [present, dismiss] = useIonToast(),
    accessToken = localStorage.getItem("accessToken"),
    decode = jwtDecode(accessToken),
    [users, setUsers] = useState({
      email: decode.email,
      firstName: decode.firstName,
      lastName: decode.lastName,
      username: decode.username
    })
  // eslint-disable-next-line require-await

  const [editProfile, { loading }] = useMutation(EditProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      ...users,
      ...welcomeFormdata
    },
    update: (cache, { data: { editProfile } }) => {
      const result = cache.readQuery({
        query: getUserGql,
        variables: { username: users.username }
      })

      const getUser = result?.getUser

      if (!getUser) {
        // Handle the error or return early
        return
      }

      cache.writeQuery({
        query: getUserGql,
        variables: { username: users.username },
        data: {
          getUser: {
            ...getUser,
            user: {
              ...getUser.user,
              ...editProfile.user
            }
          }
        }
      })
    },
    onCompleted: (data) => {
      // update uesr details in redux
      if (data?.editProfile?.status?.success) {
        present({
          duration: 3000,
          message: "Thank you for the survey",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: data?.editProfile?.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
      window.innerWidth < 768
        ? window.location.replace("/home")
        : window.location.reload()
    },
    onError: (error) => {
      console.log(error)
      present({
        duration: 30000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const handleSubmit = () => {
    console.log(welcomeFormdata)
    try {
      dispatch(
        getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) })
      )

      editProfile()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full left-0  flex bottom-0 mb-6 px-6 absolute">
      <IonButton
        fill="clear"
        className={clsx(
          "bg-opacity-80",
          currentStep === 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </IonButton>
      {currentStep === 5 ? (
        <IonButton onClick={handleSubmit}>Submit</IonButton>
      ) : (
        <IonButton onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </IonButton>
      )}
    </div>
  )
}

export default StepsButtons
