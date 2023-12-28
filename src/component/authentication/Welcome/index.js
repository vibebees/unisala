import React, {
  useState,
  createContext,
  useMemo,
  useEffect,
  useRef
} from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonContent,
  IonButton,
  IonIcon
} from "@ionic/react"
import Welcome from "./Steps/welcome"
import AskMajor from "./Steps/askMajor"
import AskCurrentStatus from "./Steps/askCurrentStatus"
import AskUniversity from "./Steps/askUniversity"
import AskLevelofStudy from "./Steps/askLevelOfStudy"
import Indicators from "./Steps/Indicators"
import StepsButtons from "./Steps/StepsButtons"
import { useQuery } from "@apollo/client"
import clsx from "clsx"
import PreLoader from "../../preloader"
import "./index.css"
import { USER_SERVICE_GQL } from "servers/types"
import { GetAllQuestions } from "graphql/user"

export const WelcomeData = createContext()

const Index = ({ allProps }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [welcomeFormdata, setWelcomeFormdata] = useState({
      interestedSubjects: [],
      userStatus: "",
      interestedUni: [],
      studyLevel: ""
    }),
    { setNewUser, newUser } = allProps

  const { data, loading, error } = useQuery(GetAllQuestions, {
      context: { server: USER_SERVICE_GQL }
    }),
    questions = data?.getAllQuestions?.questions

  const stepComponents = [
      <Welcome key="welcome" />,
      <AskCurrentStatus key="userStatus" />,
      <AskMajor key="interestedSubjects" />,
      <AskLevelofStudy key="studyLevel" />,
      <AskUniversity key="interestedUni" />
    ],
    modalRef = useRef(null)

  if (loading) return <PreLoader />
  if (error) {
    return (
      <div className="text-center text-red-500 py-4">Something went wrong</div>
    )
  }
  return (
    <IonModal ref={modalRef} isOpen={newUser}>
      <WelcomeData.Provider
        value={{ data, welcomeFormdata, setWelcomeFormdata }}
      >
        <IonRow className="flex-col h-full">
          <IonCol size="auto">
            <Indicators currentStep={currentStep} />
          </IonCol>
          <IonRow className=" flex-1">
            <IonCol className=" welcomeScroll overflow-y-auto  h-full ">
              {stepComponents.map((step, index) => (
                <div
                  key={index}
                  className={clsx("step-container  absolute left-0 w-full", {
                    "z-10": currentStep === index + 1,
                    "z-0 opacity-0": currentStep !== index + 1,
                    "fade-enter": currentStep === index + 1,
                    "fade-exit": currentStep !== index + 1
                  })}
                >
                  {index === 0
                    ? step
                    : React.cloneElement(step, {
                        question: questions[index - 1],
                        category: questions[index - 1]?.category
                      })}
                </div>
              ))}
            </IonCol>
          </IonRow>

          <IonCol size="auto" className="">
            <StepsButtons
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              allProps={{
                ...allProps,
                currentStep,
                setCurrentStep,
                modalRef
              }}
            />
          </IonCol>
        </IonRow>
      </WelcomeData.Provider>
    </IonModal>
  )
}
export default Index
