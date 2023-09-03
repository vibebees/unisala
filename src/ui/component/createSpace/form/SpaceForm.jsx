import {
  IonCol,
  IonInput,
  IonLabel,
  IonRow,
  IonText,
  useIonToast
} from "@ionic/react"
import React, { useRef, useState } from "react"
import SubmitSpace from "../Button/SubmitSpace"
import { useMutation } from "@apollo/client"
import { AddSpaceCategory } from "../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../servers/types"
import { useHistory } from "react-router"

const SpaceForm = ({ setIsOpen }) => {
  const [present, dismiss] = useIonToast()
  const [redirecting, setRedirecting] = useState(false)
  const history = useHistory()
  // MUTATION TO CREATE A NEW SPACE

  const [addSpaceCategory, { error }] = useMutation(AddSpaceCategory, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (!data?.addSpaceCategory?.status?.success) {
        // SPACE CREATION UNSUCCESSFUL
        present({
          duration: 5000,
          className: "text-white font-bold",
          message: data?.addSpaceCategory?.status?.message,
          buttons: [
            {
              text: "Redirect?",
              handler: () => {
                setIsOpen(false)
                setTimeout(() => {
                  history.push(`/space/${spaceNameRef?.current?.value}`)
                })
              }
            }
          ],
          color: "danger",
          mode: "ios"
        })
      } else {
        // SPACE CREATING SUCCESSFUL
        setRedirecting(true)
        present({
          duration: 3000,
          message: "Space has been created",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
        setTimeout(() => {
          history.push("/space/" + data?.addSpaceCategory?.spaceCategory?.name)
        })
      }
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const spaceNameRef = useRef(null)
  const descriptionRef = useRef(null)

  // handler to create new space
  const handleSubmit = (e) => {
    e.preventDefault()
    addSpaceCategory({
      variables: {
        name: spaceNameRef?.current?.value,
        description: descriptionRef?.current?.value
      }
    })
  }

  return (
    <form className=" p-4" onSubmit={handleSubmit}>
      <IonRow>
        <IonCol>
          <IonLabel className="font-semibold " color="dark">
            Name <span className="text-[red]">*</span>
          </IonLabel>
          <IonInput
            type="text"
            placeholder="Name of your space"
            fill="outline"
            required
            ref={spaceNameRef}
            color="dark"
            className="mt-2  border border-black w-full "
          ></IonInput>
        </IonCol>
      </IonRow>

      <IonRow className="mt-4">
        <IonCol>
          <IonLabel className="font-semibold" color={"dark"}>
            Description
            <span className="ml-1 text-xs font-500 text-gray-700">
              ( Describe about your space in short)
            </span>
          </IonLabel>
          <IonInput
            color="dark"
            type="text"
            ref={descriptionRef}
            fill="outline"
            placeholder="This space is about ....."
            className="mt-2 text-sm border border-black  w-full"
          ></IonInput>
        </IonCol>
      </IonRow>

      <SubmitSpace redirecting={redirecting} />
    </form>
  )
}

export default SpaceForm
