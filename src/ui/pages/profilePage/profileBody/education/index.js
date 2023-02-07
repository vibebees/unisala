// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonButton,
  useIonToast
} from "@ionic/react"
import { create, eyeOff, add, eye } from "ionicons/icons"
import EducationPop from "./EducationPop"
import { useMutation } from "@apollo/client"
import ToggleView from "../../../../../graphql/user/ToggleView"

function Education({ education, myProfile }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { schools } = education ?? {}
  const [schoolList, setSchoolList] = useState(schools ?? [])
  const [isCardPrivate, setIsCardPrivate] = useState(education?.private)
  const [toggleView, { data }] = useMutation(ToggleView, {
    variables: { card: "education" },
    onCompleted: (data) => {
      if (data.toggleView.status.success) {
        present({
          duration: 3000,
          message: data.toggleView.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsCardPrivate(!isCardPrivate)
      }
    }
  })
  const [input, setInput] = useState({
    school: schools?.school ?? "",
    degree: schools?.degree ?? "",
    major: schools?.major ?? "",
    startDate: schools?.startDate ?? "",
    graduationDate: schools?.graduationDate ?? ""
  })

  const [present, dismiss] = useIonToast()

  if (
    !myProfile &&
    (education?.private || (Array.isArray(schools) && schools.length === 0))
  ) {
    return ""
  }
  return (
    <>
      <IonCard className="mb-2">
        <IonCardContent className="card-bb flex">
          <h1>Education</h1>
          {myProfile && (
            <div className="inline-flex">
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={!isCardPrivate ? eyeOff : eye}
                onClick={() => {
                  toggleView()
                }}
              />
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={add}
                onClick={() => {
                  setIsOpen(true)
                  setIsEdit(false)
                  setInput({
                    school: "",
                    degree: "",
                    major: "",
                    startDate: "",
                    graduationDate: ""
                  })
                }}
              />
            </div>
          )}
        </IonCardContent>

        {myProfile && Array.isArray(schools) && schools.length === 0 ? (
          <IonCardContent className="center-text">
            <p>Share something about yourself</p>
            <IonButton color="primary" mode="ios" className="icon-text ">
              Add About
            </IonButton>
          </IonCardContent>
        ) : (
          <IonCardContent>
            <IonList>
              {Array.isArray(schoolList) &&
                schoolList.map((education, i) => {
                  const { img, school, degree, major, graduationDate } =
                    education
                  return (
                    <IonItem key={i}>
                      <IonAvatar slot="start">
                        <img
                          src={
                            img ??
                            "https://cdn-icons-png.flaticon.com/512/658/658960.png?w=740&t=st=1670169833~exp=1670170433~hmac=76735f9263206556f71a7cfd3348a540d4a4414e9d9269a72743db50877b877b"
                          }
                          alt="uni"
                        />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{school}</h2>
                        <p>{degree}</p>
                        <p>{major}</p>
                        <p>{graduationDate}</p>
                      </IonLabel>
                      {myProfile && (
                        <IonIcon
                          className="grey-icon-32 mr-1"
                          icon={create}
                          onClick={() => {
                            setIsOpen(true)
                            setIsEdit(true)
                            setInput(education)
                          }}
                        />
                      )}
                    </IonItem>
                  )
                })}
            </IonList>
          </IonCardContent>
        )}
        <EducationPop
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          input={input}
          setInput={setInput}
          schoolList={schoolList}
          setSchoolList={setSchoolList}
        />
      </IonCard>
    </>
  )
}

export default Education
