import React, { useState, useContext } from "react"
import {
  IonGrid,
  IonText,
  IonCheckbox,
  IonRow,
  IonItem,
  IonSkeletonText,
  IonThumbnail,
  IonList,
  IonSearchbar
} from "@ionic/react"
import { WelcomeData } from ".."
import { universityServer } from "../../../../../servers/endpoints"
import axios from "axios"
import { useDebouncedEffect } from "../../../../../hooks/useDebouncedEffect"

const SecondStep = () => {
  const [searchInput, setSearchInput] = useState(false),
    [searcTerm, setSearchTerm] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [results, setResults] = useState([]),
    {
      data: QuestionData,
      setWelcomeFormdata,
      welcomeFormdata
    } = useContext(WelcomeData)

  const getMajors = async () => {
    const token = localStorage.getItem("accessToken")
    setIsLoading(true)
    try {
      const res = await axios.get(
        `${universityServer}/keyword/spaces/${searcTerm}/10`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setResults(res.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInput = () => {
    getMajors()
  }

  const firstQuestion = QuestionData.getAllQuestions.questions[0].text,
    Questionoptions = QuestionData.getAllQuestions.questions[0].options

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
  }

  useDebouncedEffect(handleInput, [searcTerm], 1500)

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
          <IonGrid className="mt-8 grid grid-cols-2 gap-8 max-md:grid-cols-1 ">
            {Questionoptions.map((item, index) => {
              return (
                <>
                  <IonRow class="gap-2" key={index}>
                    <IonCheckbox value={item.value} onClick={handleclick}>
                      {item.key}
                    </IonCheckbox>
                    <label className="text-sm font-medium text-neutral-600">
                      {item.key}
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
                    <div className="absolute z-50 bottom-0  -top-11 bg-neutral-200 right-0 max-md:w-full max-md:bottom-32  max-md:shadow-md  w-1/2 ">
                      <IonSearchbar
                        placeholder="Search for a major"
                        className=" font-medium text-neutral-600"
                        value={searcTerm}
                        onIonInput={(e) => setSearchTerm(e.target.value)}
                      ></IonSearchbar>
                      <IonList className="overflow-y-scroll searchlist h-full border rounded-md">
                        <>
                          {isLoading && (
                            <>
                              <div className="border  h-12 w-full">
                                <IonThumbnail slot="start" className="w-full">
                                  <IonSkeletonText
                                    animated={true}
                                  ></IonSkeletonText>
                                </IonThumbnail>
                              </div>
                              <div className="border  h-12 w-full">
                                <IonThumbnail slot="start" className="w-full">
                                  <IonSkeletonText
                                    animated={true}
                                  ></IonSkeletonText>
                                </IonThumbnail>
                              </div>
                              <div className="border  h-12 w-full">
                                <IonThumbnail slot="start" className="w-full">
                                  <IonSkeletonText
                                    animated={true}
                                  ></IonSkeletonText>
                                </IonThumbnail>
                              </div>
                              <div className="border  h-12 w-full">
                                <IonThumbnail slot="start" className="w-full">
                                  <IonSkeletonText
                                    animated={true}
                                  ></IonSkeletonText>
                                </IonThumbnail>
                              </div>
                            </>
                          )}
                        </>
                        {!isLoading &&
                          results.length > 0 &&
                          results.map((item, index) => {
                            return (
                              <>
                                <IonItem key={index}>
                                  <ion-checkbox
                                    value={item.id}
                                    onClick={handleclick}
                                  >
                                    {item.name}
                                  </ion-checkbox>
                                  <span className="px-2 text-sm font-medium text-neutral-600">
                                    {item.name}
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
