import React, { useContext } from "react"
import { IonButton } from "@ionic/react"
import clsx from "clsx"
import { WelcomeData } from ".."

const StepsButtons = ({ currentStep, setCurrentStep }) => {
  const { mockWelcomedata, setWelcomeFormdata, welcomeFormdata } =
      useContext(WelcomeData),
    handleSubmit = () => {
      console.log(welcomeFormdata)
    }

  return (
    <div className="w-full left-0 flex bottom-0 mb-6 px-6 absolute">
      <IonButton
        fill="clear"
        className={clsx(
          "bg-opacity-80",
          currentStep === 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </IonButton>
      {currentStep === 5 ? (
        <IonButton onClick={handleSubmit}>Submit</IonButton>
      ) : (
        <IonButton onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </IonButton>
      )}
    </div>
  )
}

export default StepsButtons
