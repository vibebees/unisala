// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import { useMutation } from "@apollo/client"
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonToast
} from "@ionic/react"
import { AddEducation, EditEducation } from "../../../../../graphql/user"

const EducationPop = ({
  isOpen,
  setIsOpen,
  setInput,
  isEdit,
  input,
  setSchoolList
}) => {
  const [executeMutation, { data }] = useMutation(
    isEdit ? EditEducation : AddEducation
  )
  const [present, dismiss] = useIonToast()
  const handelChange = (e) => {
    setInput((pree) => {
      return { ...pree, [e.target.name]: e.target.value }
    })
  }
  const handelSubmit = (e) => {
    e.preventDefault()
    executeMutation({
      variables: {
        id: input?._id,
        school: input?.school,
        degree: input?.degree,
        major: input?.major,
        startDate: input?.startDate,
        graduationDate: input?.graduationDate
      }
    })
    isEdit &&
      setSchoolList((prev) => {
        return prev.map((item) => {
          if (item._id === input?._id) {
            return {
              ...item,
              school: input?.school,
              degree: input?.degree,
              major: input?.major,
              startDate: input?.startDate,
              graduationDate: input?.graduationDate
            }
          }
          return item
        })
      })

    setIsOpen(false)
  }
  useEffect(() => {
    if (data?.addEducation?.status?.success) {
      present({
        duration: 3000,
        message: "Education Added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
      setSchoolList(data?.addEducation?.education?.schools)
    }
  }, [data])
  return (
    <IonModal
      onDidDismiss={() => {
        setIsOpen(false)
      }}
      isOpen={isOpen}
      mode="ios"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Education</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding modal-content">
        <form onSubmit={handelSubmit}>
          <div className="mb-1">
            <h5>School</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="school"
              onIonChange={handelChange}
              placeholder="School"
              value={input?.school}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Degree</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="degree"
              onIonChange={handelChange}
              placeholder="Degree"
              value={input?.degree}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Major</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="major"
              onIonChange={handelChange}
              placeholder="Major"
              value={input?.major}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Start Date</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="startDate"
              onIonChange={handelChange}
              placeholder="Start Date"
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Graduation Date</h5>
            <IonInput
              mode="md"
              className="input-box"
              name="graduationDate"
              onIonChange={handelChange}
              placeholder="Graduation Date"
            ></IonInput>
          </div>
          <IonButton type="submit" mode="ios" expand="block">
            Save Changes
          </IonButton>
        </form>
      </IonContent>
    </IonModal>
  )
}

export default EducationPop
