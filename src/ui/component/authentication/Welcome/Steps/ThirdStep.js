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
  IonInput,
  IonList,
  IonSearchbar,
  IonModal
} from "@ionic/react"
import SecondStep from "./SecondStep"
import Indicators from "./Indicators"
import FourthStep from "./FourthStep"
import { authInstance } from "../../../../../api/axiosInstance"
import { WelcomeData } from ".."
import axios from "axios"

const ThirdStep = () => {
  let [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState(false)
  const {
    data: QuestionData,
    setWelcomeFormdata,
    welcomeFormdata
  } = useContext(WelcomeData)

  const SecondQuestion = QuestionData.getAllQuestions.questions[1].text,
    Questionoptions = QuestionData.getAllQuestions.questions[1].options

  const handleclick = (e) => {
    const data = e.target.value
    if (data === welcomeFormdata.userStatus) {
      setWelcomeFormdata({ ...welcomeFormdata, userStatus: "" })
    } else {
      setWelcomeFormdata({ ...welcomeFormdata, userStatus: data })
    }

    console.log(welcomeFormdata)
  }

  return (
    <div>
      <div>
        <IonGrid className="mx-12 max-md:mx-4 mt-6 ">
          <IonGrid>
            <IonText color="primary">
              <h1 className="font-semibold text-xl  text-neutral-600">
                {SecondQuestion}
              </h1>
            </IonText>
          </IonGrid>
          <IonGrid className="mt-8 grid grid-cols-2 gap-8 max-md:grid-cols-1 ">
            {Questionoptions.map((item, index) => {
              return (
                <>
                  <IonRow class="gap-2">
                    <IonCheckbox
                      checked={item.value === welcomeFormdata.userStatus}
                      value={item.value}
                      onClick={handleclick}
                    >
                      {item.key}
                    </IonCheckbox>
                    <label className="text-sm font-medium text-neutral-600">
                      {item.key}
                    </label>
                  </IonRow>
                </>
              )
            })}

            <IonRow class="gap-2 w-1/2 flex ">
              <IonInput
                className="text-sm focus-within:border-neutral-500 transition-all ease-linear duration-200 border w-1/2 outline-none font-medium text-neutral-600"
                type="text"
                fill="solid"
                value={welcomeFormdata.userStatus}
                onIonChange={(e) => {
                  setWelcomeFormdata({
                    ...welcomeFormdata,
                    userStatus: e.target.value
                  })
                }}
                placeholder="Other"
              ></IonInput>
            </IonRow>

            <IonGrid />
          </IonGrid>
        </IonGrid>
      </div>
    </div>
  )
}

export default ThirdStep
