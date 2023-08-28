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
import SecondStep from "./SecondStep"
import Indicators from "./Indicators"
import FourthStep from "./FourthStep"
import { authInstance } from "../../../../../api/axiosInstance"
import { WelcomeData } from ".."

const FifthStep = () => {
  let [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState(false)
  const {
    data: QuestionData,
    setWelcomeFormdata,
    welcomeFormdata
  } = useContext(WelcomeData)
  const getMajors = async (query) => {
    const { data } = await authInstance.get(`/uni/keyword/spaces/${query}/10`)
    console.log(data)
    setResults(data)
  }
  const handleInput = (ev) => {
    let query = ""
    const { target } = ev
    if (target) query = target.value.toLowerCase()
    getMajors(query)
  }

  const FourthQuestion = QuestionData.getAllQuestions.questions[3].text,
    Questionoptions = QuestionData.getAllQuestions.questions[3].options

  const handleclick = (e) => {
    const data = e.target.value
    if (data === welcomeFormdata.studyLevel) {
      setWelcomeFormdata({ ...welcomeFormdata, studyLevel: "" })
    } else {
      setWelcomeFormdata({ ...welcomeFormdata, studyLevel: data })
    }
    console.log(welcomeFormdata)
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
          <IonGrid className="mt-8 grid grid-cols-2 gap-8 ">
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
