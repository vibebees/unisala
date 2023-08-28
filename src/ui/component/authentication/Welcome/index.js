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

export const WelcomeData = createContext()
const mockWelcomedata = {
  data: {
    getAllQuestions: {
      status: {
        success: true,
        message: "Successfully fetch all questions."
      },
      questions: [
        {
          text: "What’s your interested field of study?",
          type: "interestedSubjects",
          options: [
            "Computer science",
            "Biology",
            "Business",
            "Mechanical engineering"
          ],
          qnsNumber: 1,
          nextQuestion: true
        },
        {
          text: "Where are you at applying to University?",
          type: "userStatus",
          options: [
            "Just looking",
            "Actively Applying",
            "Studying",
            "Graduated"
          ],
          qnsNumber: 2,
          nextQuestion: true
        },
        {
          text: "Search University?",
          type: "interestedUni",
          options: [
            "Just looking",
            "Actively Applying",
            "Studying",
            "Graduated"
          ],
          qnsNumber: 3,
          nextQuestion: true
        },
        {
          text: "About level you want to study:",
          type: "studyLevel",
          options: [
            "Undergraduate (Bachelor)",
            "Postgraduate (Masters)",
            "Doctorate (PhD)"
          ],
          qnsNumber: 4,
          nextQuestion: false
        }
      ]
    }
  }
}
const index = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [welcomeFormdata, setWelcomeFormdata] = useState({
    interestedSubjects: [],
    userStatus: "",
    interestedUni: [],
    studyLevel: ""
  })

  const { data, loading, error } = useQuery(GetAllQuestions, {
    context: { clientName: USER_SERVICE_GQL }
  })

  if (data) {
    console.log(data)
  }

  const stepComponents = [
    <FirstStep />,
    <SecondStep />,
    <ThirdStep />,
    <FourthStep />,
    <FifthStep />
  ]

  return (
    <div className="h-96 overflow-hidden max-w-6xl w-full">
      <WelcomeData.Provider
        value={{
          mockWelcomedata,
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
