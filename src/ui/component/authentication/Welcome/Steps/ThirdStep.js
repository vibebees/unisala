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
  const { mockWelcomedata, setWelcomeFormdata, welcomeFormdata } =
    useContext(WelcomeData)
  const getMajors = async (query) => {
    const { data } = await axios.get(
      `http://localhost:4444/uni/keyword/spaces/${query}/10`
    )
    console.log(data)
    setResults(data)
  }
  const handleInput = (ev) => {
    let query = ""
    const { target } = ev
    if (target) query = target.value.toLowerCase()
    getMajors(query)
  }

  const SecondQuestion = mockWelcomedata.data.getAllQuestions.questions[1].text,
    Questionoptions = mockWelcomedata.data.getAllQuestions.questions[1].options

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
        <IonGrid className="mx-12 mt-6 ">
          <IonGrid>
            <IonText color="primary">
              <h1 className="font-semibold text-xl  text-neutral-600">
                {SecondQuestion}
              </h1>
            </IonText>
          </IonGrid>
          <IonGrid className="mt-8 grid grid-cols-2 gap-8 ">
            {Questionoptions.map((item, index) => {
              return (
                <>
                  <IonRow class="gap-2">
                    <IonCheckbox
                      checked={item === welcomeFormdata.userStatus}
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

                  console.log(welcomeFormdata)
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
