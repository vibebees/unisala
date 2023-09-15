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
      localStorage.removeItem("newUser")
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
    if (currentStep === 5 && welcomeFormdata.studyLevel === "") {
      return present({
        duration: 3000,
        message: "Please select atleast one study level",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
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

  const handleNext = () => {
    if (currentStep === 2 && welcomeFormdata.interestedSubjects.length === 0) {
      return present({
        duration: 3000,
        message: "Please select atleast one subject",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
    if (currentStep === 3 && welcomeFormdata.userStatus === "") {
      return present({
        duration: 3000,
        message: "Please select atleast one status",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
    if (currentStep === 4 && welcomeFormdata.interestedUni.length === 0) {
      return present({
        duration: 3000,
        message: "Please select atleast one university",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
    setCurrentStep(currentStep + 1)
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
        <IonButton onClick={handleNext}>Next</IonButton>
      )}
    </div>
  )
}

export default StepsButtons
