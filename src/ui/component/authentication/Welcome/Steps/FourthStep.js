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
import ThirdStep from "./ThirdStep"
import FifthStep from "./FifthStep"
import { WelcomeData } from ".."
import { authInstance } from "../../../../../api/axiosInstance"

const mockdata = [
  "computer science",
  "biology",
  "business",
  "mechanical engineering",
  "astrology",
  "astronomy",
  "mathematics",
  "physics",
  "chemistry",
  "geology",
  "geography",
  "history",
  "economics",
  "accounting",
  "finance",
  "marketing"
]

const FourthStep = () => {
  let [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState(false)
  const [currentSearchTypes, setCurrentSearchTypes] = useState("")
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
  const ThirdQuestion = QuestionData.getAllQuestions.questions[2].text,
    Questionoptions = QuestionData.getAllQuestions.questions[2].options

  const handleclick = (uniId, name) => {
    let newdata = {
      uniId,
      name,
      searchType: currentSearchTypes
    }
    const alreadyExists = welcomeFormdata.interestedUni.find(
      (item) => item.uniId === uniId
    )
    if (alreadyExists) {
      const newInterestedUni = welcomeFormdata.interestedUni.filter(
        (item) => item.uniId !== uniId
      )
      setWelcomeFormdata({
        ...welcomeFormdata,
        interestedUni: newInterestedUni
      })
    } else {
      setWelcomeFormdata({
        ...welcomeFormdata,
        interestedUni: [...welcomeFormdata.interestedUni, newdata]
      })
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
                {ThirdQuestion}
              </h1>
            </IonText>
          </IonGrid>
          <IonGrid className="mt-8 grid grid-cols-1 gap-5">
            {Questionoptions.map((item, index) => {
              return (
                <>
                  <IonRow key={index} class="gap-2 flex w-full  col-span-1">
                    <div className="flex items-center  gap-3">
                      <IonCheckbox
                        value={item}
                        checked={item === currentSearchTypes}
                        onClick={(e) => {
                          if (item === currentSearchTypes) {
                            setCurrentSearchTypes("")
                          } else {
                            setCurrentSearchTypes(e.target.value)
                          }
                        }}
                      >
                        {item}
                      </IonCheckbox>
                      <label className="text-sm font-medium text-neutral-600">
                        {item}
                      </label>
                    </div>
                    <div>
                      {currentSearchTypes.trim() !== "" && (
                        <>
                          <div className="absolute z-50 bottom-10  -top-11 bg-neutral-200 right-0 w-1/2 border-2">
                            <IonSearchbar
                              placeholder="Search for a major"
                              className=" font-medium text-neutral-600"
                              debounce={1000}
                              onIonInput={(ev) => handleInput(ev)}
                            ></IonSearchbar>
                            <IonList className="overflow-y-scroll h-full">
                              {mockdata.map((item, index) => {
                                return (
                                  <>
                                    <IonItem key={index}>
                                      <ion-checkbox
                                        value={item}
                                        onClick={handleclick}
                                      >
                                        {item}
                                      </ion-checkbox>
                                      <span className="px-2 text-sm font-medium text-neutral-600">
                                        {item}
                                      </span>
                                    </IonItem>
                                  </>
                                )
                              })}
                            </IonList>
                          </div>
                        </>
                      )}
                    </div>
                  </IonRow>
                </>
              )
            })}
            <IonGrid />
          </IonGrid>
        </IonGrid>
      </div>
    </div>
  )
}

export default FourthStep
