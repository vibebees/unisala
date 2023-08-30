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
import axios from "axios"
import { universityServer } from "../../../../../servers/endpoints"
import { useDebouncedEffect } from "../../../../../hooks/useDebouncedEffect"
import Noimagefound from "./../../../../../assets/no_image_found.png"
import clsx from "clsx"

const FourthStep = () => {
  const [results, setResults] = useState([]),
    [searcTerm, setSearchTerm] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [currentSearchTypes, setCurrentSearchTypes] = useState(""),
    {
      data: QuestionData,
      setWelcomeFormdata,
      welcomeFormdata
    } = useContext(WelcomeData)

  const getUniversitites = async () => {
    const token = localStorage.getItem("accessToken")
    setIsLoading(true)
    try {
      const res = await axios.get(
        `${universityServer}/keyword/schoolname/${token}/5`,
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

  const ThirdQuestion = QuestionData.getAllQuestions.questions[2].text,
    Questionoptions = QuestionData.getAllQuestions.questions[2].options

  const handleclick = (e) => {
    let newdata = {
      unitId: e.target.value,
      searchType: currentSearchTypes
    }

    const alreadyExists = welcomeFormdata.interestedUni.find(
      (item) => item.unitId === e.target.value
    )
    if (alreadyExists) {
      const newInterestedUni = welcomeFormdata.interestedUni.filter(
        (item) => item.unitId !== e.target.value
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

  useDebouncedEffect(handleInput, [searcTerm], 1500)

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
          <div
            key={11112222}
            className={clsx(
              "hidden overflow-hidden  duration-300 ease-linear transition-all  max-md:block ",
              currentSearchTypes.trim() === "" ? "h-0 " : "h-56 "
            )}
          >
            <div className=" mt-2 max-md:block  bg-neutral-200  w-4/5 ">
              <IonSearchbar
                placeholder={`Search ${currentSearchTypes}...`}
                className=" font-medium text-neutral-600"
                onIonInput={(e) => setSearchTerm(e.target.value)}
              ></IonSearchbar>
              <IonList className="overflow-y-scroll searchlist border rounded-md  h-36">
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
                    <div className="max-md:hidden" key={5198187718}>
                      {currentSearchTypes.trim() !== "" && (
                        <>
                          <div className="absolute z-50 bottom-10  -top-11 bg-neutral-200 right-24  w-[55%] ">
                            <IonSearchbar
                              placeholder={`Search ${currentSearchTypes}...`}
                              className=" font-medium text-neutral-600"
                              onIonInput={(e) => setSearchTerm(e.target.value)}
                            ></IonSearchbar>
                            <IonList className="overflow-y-scroll searchlist border rounded-md h-full">
                              <>
                                {isLoading && (
                                  <>
                                    <div className="border  h-12 w-full">
                                      <IonThumbnail
                                        slot="start"
                                        className="w-full"
                                      >
                                        <IonSkeletonText
                                          animated={true}
                                        ></IonSkeletonText>
                                      </IonThumbnail>
                                    </div>
                                    <div className="border  h-12 w-full">
                                      <IonThumbnail
                                        slot="start"
                                        className="w-full"
                                      >
                                        <IonSkeletonText
                                          animated={true}
                                        ></IonSkeletonText>
                                      </IonThumbnail>
                                    </div>
                                    <div className="border  h-12 w-full">
                                      <IonThumbnail
                                        slot="start"
                                        className="w-full"
                                      >
                                        <IonSkeletonText
                                          animated={true}
                                        ></IonSkeletonText>
                                      </IonThumbnail>
                                    </div>
                                    <div className="border  h-12 w-full">
                                      <IonThumbnail
                                        slot="start"
                                        className="w-full"
                                      >
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
                                          value={item.unitId}
                                          onClick={handleclick}
                                        >
                                          {item.name}
                                        </ion-checkbox>

                                        <img
                                          src={
                                            item.picture
                                              ? item.picture
                                              : Noimagefound
                                          }
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
