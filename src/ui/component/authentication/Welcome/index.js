/* eslint-disable react/jsx-key */
import React, { useState, createContext } from "react"
import { IonContent, IonNav } from "@ionic/react"
import FirstStep from "./Steps/FirstStep"
import { useQuery } from "@apollo/client"
import { GetAllQuestions } from "../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../servers/types"
import SecondStep from "./Steps/SecondStep"
import ThirdStep from "./Steps/ThirdStep"
import FourthStep from "./Steps/FourthStep"
import FifthStep from "./Steps/FifthStep"
import Indicators from "./Steps/Indicators"
import StepsButtons from "./Steps/StepsButtons"
import clsx from "clsx"
import PreLoader from "../../preloader"

export const WelcomeData = createContext()
const index = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [welcomeFormdata, setWelcomeFormdata] = useState({
      interestedSubjects: [],
      userStatus: "",
      interestedUni: [],
      studyLevel: ""
    }),
    { data, loading, error } = useQuery(GetAllQuestions, {
      context: { server: USER_SERVICE_GQL }
    })

  if (loading) {
    return (
      <>
        <PreLoader />
      </>
    )
  }
  if (error) {
    console.log(error)
  }

  const stepComponents = [
    <FirstStep />,
    <SecondStep />,
    <ThirdStep />,
    <FourthStep />,
    <FifthStep />
  ]

  return (
    <div className="h-96  max-md:h-[80vh]   overflow-hidden max-md:grid max-md:place-content-start max-w-6xl w-full">
      <WelcomeData.Provider
        value={{
          data,
          welcomeFormdata,
          setWelcomeFormdata
        }}
      >
        <Indicators currentStep={currentStep} />
        <div className="flex">
          {stepComponents.map((step, index) => (
            <div
              key={index}
              className={clsx("absolute", {
                "z-10": currentStep === index + 1,
                "z-0 opacity-0": currentStep !== index + 1,
                "fade-enter": currentStep === index + 1,
                "fade-exit": currentStep !== index + 1
              })}
            >
              {step}
            </div>
          ))}
        </div>
        <StepsButtons
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </WelcomeData.Provider>
    </div>
  )
}

export default index
