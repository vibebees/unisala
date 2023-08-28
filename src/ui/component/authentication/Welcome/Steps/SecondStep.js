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
import { searchCircle } from "ionicons/icons"
import ThirdStep from "./ThirdStep"
import Indicators from "./Indicators"
import FirstStep from "./FirstStep"
import SearchInput from "../../../SearchInput"
import { authInstance } from "../../../../../api/axiosInstance"
import { WelcomeData } from ".."
import { UniSearchDataList } from "../../../../../graphql/uni"
import { UNIVERSITY_SERVICE_GQL } from "../../../../../servers/types"
import { useLazyQuery } from "@apollo/client"

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

const SecondStep = () => {
  const [searchInput, setSearchInput] = useState(false),
    [results, setResults] = useState([]),
    { mockWelcomedata, setWelcomeFormdata, welcomeFormdata } =
      useContext(WelcomeData),
    [GetUni, unidata] = useLazyQuery(UniSearchDataList(searchInput), {
      context: { server: UNIVERSITY_SERVICE_GQL }
    })

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

  const firstQuestion = mockWelcomedata.data.getAllQuestions.questions[0].text,
    Questionoptions = mockWelcomedata.data.getAllQuestions.questions[0].options

  console.log(firstQuestion, Questionoptions)

  const handleclick = (e) => {
    const data = e.target.value
    if (!welcomeFormdata.interestedSubjects.includes(data)) {
      let newdata = [...welcomeFormdata.interestedSubjects, data]
      setWelcomeFormdata((prev) => {
        return { ...prev, interestedSubjects: newdata }
      })
    } else {
      //remove the existing data from the array
      let newdata = welcomeFormdata.interestedSubjects.filter(
        (item) => item !== data
      )
      setWelcomeFormdata((prev) => {
        return { ...prev, interestedSubjects: newdata }
      })
    }
    console.log(welcomeFormdata)
  }

  return (
    <div>
      <div>
        <IonGrid className="!px-12 mt-6 ">
          <IonGrid>
            <IonText color="primary">
              <h1 className="font-semibold text-xl  text-neutral-600">
                {firstQuestion}
              </h1>
            </IonText>
          </IonGrid>
          <IonGrid className="mt-8 grid grid-cols-2 gap-8 ">
            {Questionoptions.map((item, index) => {
              return (
                <>
                  <IonRow class="gap-2">
                    <IonCheckbox value={item} onClick={handleclick}>
                      {item}
                    </IonCheckbox>
                    <label className="text-sm font-medium text-neutral-600">
                      {item}
                    </label>
                  </IonRow>
                </>
              )
            })}

            <IonRow class="gap-2 flex w-full  col-span-1">
              <div className="flex items-center  gap-3">
                <IonCheckbox
                  value={searchInput}
                  onClick={(e) => {
                    setSearchInput(e.target.checked)
                  }}
                >
                  Other
                </IonCheckbox>
                <label className="text-sm font-medium text-neutral-600">
                  Other
                </label>
              </div>
              <div>
                {searchInput && (
                  <>
                    <div className="absolute z-50 bottom-0  -top-11 bg-neutral-200 right-0 w-1/2 border-2">
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
            <IonGrid />
          </IonGrid>
        </IonGrid>
      </div>
    </div>
  )
}

export default SecondStep
