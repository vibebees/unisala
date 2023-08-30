import React, { useState, useContext } from "react"
import {
  IonGrid,
  IonText,
  IonButton,
  IonHeader,
  IonContent,
  IonNavLink,
  IonCheckbox,
  IonToolbar,
  IonTitle,
  IonRow,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonModal
} from "@ionic/react"
import { WelcomeData } from ".."
import { useMutation } from "@apollo/client"

const FifthStep = () => {
  const {
    data: QuestionData,
    setWelcomeFormdata,
    welcomeFormdata
  } = useContext(WelcomeData)

  const FourthQuestion = QuestionData.getAllQuestions.questions[3].text,
    Questionoptions = QuestionData.getAllQuestions.questions[3].options

  const handleclick = (e) => {
    const data = e.target.value
    if (data === welcomeFormdata.studyLevel) {
      setWelcomeFormdata({ ...welcomeFormdata, studyLevel: "" })
    } else {
      setWelcomeFormdata({ ...welcomeFormdata, studyLevel: data })
    }
  }

  return (
    <div>
      <div>
        <IonGrid className="mx-12 mt-14 ">
          <IonGrid>
            <IonText color="primary">
              <h1 className="font-semibold text-xl  text-neutral-600">
                {FourthQuestion}
              </h1>
            </IonText>
          </IonGrid>
          <IonGrid className="mt-8 grid grid-cols-2 max-md:grid-cols-1 gap-8 ">
            {Questionoptions.map((item, index) => {
              return (
                <>
                  <IonRow class="gap-2">
                    <IonCheckbox
                      checked={item === welcomeFormdata.studyLevel}
                      value={item}
                      onClick={handleclick}
                    >
                      {item}
                    </IonCheckbox>
                    <label className="text-sm font-medium text-neutral-600">
                      {item}
                    </label>
                  </IonRow>
                </>
              )
            })}
          </IonGrid>
        </IonGrid>
      </div>
    </div>
  )
}

export default FifthStep
