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
  const ThirdQuestionDes = QuestionData.getAllQuestions.questions[2].desc

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
    <div className=" w-full ">
      <div>
        <IonGrid className="mx-12 max-md:mx-3 mt-6 ">
          <IonGrid>
            <IonText color="primary">
              <h1 className="font-semibold text-xl  text-neutral-600">
                {ThirdQuestion}
              </h1>
              {ThirdQuestionDes}
            </IonText>
          </IonGrid>
          <div
            key={11112222}
            className={clsx(
              "hidden overflow-hidden  duration-300 ease-linear w-full transition-all  max-md:block h-80 "
            )}
          >
            <div className=" mt-2 max-md:block max-md:w-full   bg-neutral-200  w-4/5 ">
              <IonSearchbar
                placeholder={`🏛️ Search universities...`}
                className=" font-medium text-neutral-600"
                onIonInput={(e) => setSearchTerm(e.target.value)}
              ></IonSearchbar>
              <IonList className="overflow-y-scroll searchlist border rounded-md  h-60">
                <>
                  {isLoading && (
                    <>
                      <div className="  h-12 w-full">
                        <IonThumbnail slot="start" className="w-full">
                          <IonSkeletonText animated={true}></IonSkeletonText>
                        </IonThumbnail>
                      </div>

                      <div className="border  h-12 w-full">
                        <IonThumbnail slot="start" className="w-full">
                          <IonSkeletonText animated={true}></IonSkeletonText>
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
                            value={item.unitId}
                            onClick={handleclick}
                          >
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
                      </>
                    )
                  })}
              </IonList>
            </div>
          </div>
        </IonGrid>
      </div>
      <div className="max-md:hidden    w-full  bg-blue-500 " key={5198187718}>
        <div className="absolute z-50  right-0  bottom-20  h-60   -top-14 bg-neutral-200   w-1/2  ">
          <IonSearchbar
                placeholder={`Georgia State University 🏛️ `}
                className=" font-medium text-neutral-600"
            onIonInput={(e) => setSearchTerm(e.target.value)}
          ></IonSearchbar>
          <IonList className="overflow-y-scroll searchlist border rounded-md h-full">
            <>
              {isLoading && (
                <>
                  <div className="border  h-12 w-full">
                    <IonThumbnail slot="start" className="w-full">
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    </IonThumbnail>
                  </div>
                  <div className="border  h-12 w-full">
                    <IonThumbnail slot="start" className="w-full">
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    </IonThumbnail>
                  </div>
                  <div className="border  h-12 w-full">
                    <IonThumbnail slot="start" className="w-full">
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    </IonThumbnail>
                  </div>
                  <div className="border  h-12 w-full">
                    <IonThumbnail slot="start" className="w-full">
                      <IonSkeletonText animated={true}></IonSkeletonText>
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
                  </>
                )
              })}
          </IonList>
        </div>
      </div>
    </div>
  )
}

export default FourthStep
