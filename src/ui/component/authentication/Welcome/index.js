/* eslint-disable react/jsx-key */
import React, { useState, createContext } from "react"
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
    return (
      <div className="text-center text-red-500 py-4">Something went wrong</div>
    )
  }

  const stepComponents = [
    <FirstStep />,
    <SecondStep />,
    <ThirdStep />,
    <FourthStep />,
    <FifthStep />
  ]

  return (
    <>
      <div className="fixed  left-0 top-0 z-[10] max-md:px-8 py-5 bg-black bg-opacity-30 h-full grid place-items-center w-full">
        <div className="h-96 relative z-50 max-md:h-[80vh]  bg-white shadow-lg  overflow-hidden   max-w-3xl w-full">
          <WelcomeData.Provider
            value={{
              data,
              welcomeFormdata,
              setWelcomeFormdata
            }}
          >
            <Indicators currentStep={currentStep} />
            <div className="flex relative w-full">
              {stepComponents.map((step, index) => (
                <div
                  key={index}
                  className={clsx("absolute  right-0 left-0 ", {
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
      </div>
    </>
  )
}

export default index
