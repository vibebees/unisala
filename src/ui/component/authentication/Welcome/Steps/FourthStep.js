import React, { useState, useContext, useEffect } from "react"
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
import axios from "axios"
import { universityServer } from "../../../../../servers/endpoints"
import { useDebouncedEffect } from "../../../../../hooks/useDebouncedEffect"
import Noimagefound from "./../../../../../assets/no_image_found.png"
import clsx from "clsx"

const FourthStep = () => {
  const [results, setResults] = useState([]),
    {
      data: QuestionData,
      setWelcomeFormdata,
      welcomeFormdata
    } = useContext(WelcomeData),
    [searcTerm, setSearchTerm] = useState(""),
    [isLoading, setIsLoading] = useState(false)

  const getUniversitites = async () => {
    const token = localStorage.getItem("accessToken")
    setIsLoading(true)
    try {
      const res = await axios.get(
        `${universityServer}/keyword/schoolname/${searcTerm}/5`,
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
    getUniversitites()
  }

  const ThirdQuestion = QuestionData.getAllQuestions.questions[2].text
  const ThirdQuestionDes = QuestionData.getAllQuestions.questions[2].desc || ""

  const handleclick = (e) => {
    const alreadyExists = welcomeFormdata.interestedUni.includes(e.target.value)
    if (alreadyExists) {
      const newInterestedUni = welcomeFormdata.interestedUni.filter(
        (item) => item !== e.target.value
      )
      setWelcomeFormdata({
        ...welcomeFormdata,
        interestedUni: newInterestedUni
      })
    } else {
      setWelcomeFormdata({
        ...welcomeFormdata,
        interestedUni: [
          ...welcomeFormdata.interestedUni,
          Number(e.target.value)
        ]
      })
    }
  }

  useDebouncedEffect(handleInput, [searcTerm], 0)

  return (
    <div className="w-full">

        <IonText color="primary">
          <h1 className="font-semibold text-xl  text-neutral-600">
            {ThirdQuestion}
          </h1>
          {ThirdQuestionDes}
        </IonText>

          <div className="mt-2 w-full bg-neutral-200">
            <IonSearchbar
              placeholder={`Georgia State University 🏛️` }
              className="font-medium text-neutral-600 w-full"
              onIonInput={(e) => setSearchTerm(e.target.value)}
            />
            <IonList className="w-full border rounded-md h-60">
              {isLoading ? (
                <IonSkeletonText animated={true} />
              ) : (
                results.map((item, index) => (
                  <IonItem key={index} className="w-full">
                    <ion-checkbox value={item.unitId} onClick={handleclick}>
                      {item.name}
                    </ion-checkbox>
                    <img
                      src={item.picture ? item.picture : Noimagefound}
                      alt={item.name}
                      className="w-10 h-11 mx-2 ml-4 rounded-sm"
                    />
                    <span className="px-2 text-sm font-medium text-neutral-600">
                      {item.name}
                    </span>
                  </IonItem>
                ))
              )}
            </IonList>
          </div>

  </div>

  )
}

export default FourthStep
