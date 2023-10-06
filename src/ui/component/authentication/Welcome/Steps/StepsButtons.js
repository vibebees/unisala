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

const StepsButtons = ({allProps}) => {
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
    }),
    { currentStep, setCurrentStep, setNewUser, modalRef } = allProps
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
        modalRef.current.dismiss()

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
          message: data?.editProfile?.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
      localStorage.removeItem("newUser")
      setNewUser(false)
    },
    onError: (error) => {
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

    try {
      dispatch(
        getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) })
      )

      editProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const validationFunctions = [
    () => true, // Step 1 validation function
    () => {
      // Step 2 validation function
      return welcomeFormdata.userStatus.length > 0
    },
    () => {
      // Step 3 validation function
      return welcomeFormdata.interestedSubjects !== ""
    },
    () => {
      // Step 3 validation function
      return welcomeFormdata.studyLevel !== ""
    },
    () => {
      // Step 4 validation function
      return welcomeFormdata.interestedUni.length > 0
    },
    () => true // Step 5 validation function
  ]
  const handleNext = () => {
  console.log({currentStep})
    const isValid = validationFunctions[currentStep - 1]()

    if (!isValid) {
      return present({
        duration: 3000,
        message: "Please fill out the required fields",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }

    setCurrentStep(currentStep + 1)
  }
return (
    <div className="w-full left-0 flex bottom-0 mb-16 px-6 absolute z-50 pad tp-16">
      <IonButton
        fill="clear"
        className={clsx(
          "bg-opacity-80 flex-shrink-0",
          currentStep === 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </IonButton>
      <IonButton
        className="flex-shrink-0"
        onClick={currentStep === 5 ? handleSubmit : handleNext}
      >
        {currentStep === 5 ? "Submit" : "Next"}
      </IonButton>
    </div>
)

}

export default StepsButtons
