import React, { useContext } from "react"
import {
  IonGrid,
  IonText,
  IonCheckbox,
  IonRow,
  IonInput,
  IonCardSubtitle
} from "@ionic/react"
import { WelcomeData } from ".."

const QuestionTitle = ({ title }) => (
  <IonText color="primary">
    <h1 className="font-semibold text-xl text-neutral-600">{title}</h1>
  </IonText>
)

const StatusOption = ({ value, label, handleClick, isChecked }) => (
  <IonRow class="gap-2 items-start  flex-nowrap ">
    <IonCheckbox
      className="shrink-0 mt-1"
      checked={isChecked}
      value={value}
      onClick={handleClick}
    >
      {label}
    </IonCheckbox>
    <label className="text-sm  font-medium text-neutral-600">{label}</label>
  </IonRow>
)

const OtherInput = ({ value, handleInputChange }) => (
  <IonRow class="gap-2 w-1/2 flex ">
    <IonInput
      className="text-sm focus-within:border-neutral-500 transition-all ease-linear duration-200 border w-1/2 outline-none font-medium text-neutral-600"
      type="text"
      fill="solid"
      value={value}
      onIonChange={handleInputChange}
      placeholder="Other"
    />
  </IonRow>
)

const AskCurrentStatus = ({ question }) => {
  const {
    data: QuestionData,
    setWelcomeFormdata,
    welcomeFormdata
  } = useContext(WelcomeData)

  const { text, options, category, description } = question

  const handleclick = (e) => {
    const data = e.target.value
    if (data) {
      setWelcomeFormdata({ ...welcomeFormdata, userStatus: data })
    }
  }

  return (
    <div>
      <div>
        <IonGrid className="mx-12 max-md:mx-4 mt-6 ">
          <IonGrid>
            <QuestionTitle title={text} />
          </IonGrid>
          <IonCardSubtitle className="text-center">
            Select your current or intended academic level of study in the USA
          </IonCardSubtitle>
          <IonGrid className="mt-8  grid grid-cols-2 gap-8 max-md:grid-cols-1 ">
            {options.map((item) => (
              <StatusOption
                key={item.value}
                value={item.value}
                label={item.key}
                handleClick={handleclick}
                isChecked={item.value === welcomeFormdata.userStatus}
              />
            ))}
            <OtherInput
              value={welcomeFormdata.userStatus}
              handleInputChange={(e) => {
                setWelcomeFormdata({
                  ...welcomeFormdata,
                  userStatus: e.target.value
                })
              }}
            />
            <IonGrid />
          </IonGrid>
        </IonGrid>
      </div>
    </div>
  )
}
export default AskCurrentStatus
