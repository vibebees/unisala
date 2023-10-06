import React, { useContext } from "react"
import {
  IonGrid,
  IonText,
  IonCheckbox,
  IonRow,
  IonCardSubtitle
} from "@ionic/react"
import { WelcomeData } from ".."

const StudyLevelOption = ({ value, label, isChecked, handleClick }) => (
  <IonRow className="gap-2">
    <IonCheckbox
      checked={isChecked}
      value={value}
      onClick={handleClick}
    >
      {label}
    </IonCheckbox>
    <label className="text-sm font-medium text-neutral-600">
      {label}
    </label>
  </IonRow>
)

const QuestionHeader = ({ text }) => (
  <IonGrid>
    <IonText color="primary">
      <h1 className="font-semibold text-xl text-neutral-600">
        {text}
      </h1>
    </IonText>
  </IonGrid>
)

const LevelOfStudy = ({question}) => {
  const {
    data: QuestionData,
    setWelcomeFormdata,
    welcomeFormdata
  } = useContext(WelcomeData),
    {text, options, description} = question

  const handleclick = (e) => {
    const data = e.target.value
    if (data) {
      setWelcomeFormdata({ ...welcomeFormdata, studyLevel: data })
    }
  }

  return (
    <div>
      <div>
        <IonGrid className="mx-12 max-md:mx-3 mt-14 ">
          <QuestionHeader text={text} />
          <IonCardSubtitle className="text-center">
            {description}
          </IonCardSubtitle>

          <IonGrid className="mt-8 grid grid-cols-2 max-md:grid-cols-1 gap-8 ">
            {options.map((item) => (
              <StudyLevelOption
                key={item.value}
                value={item.value}
                label={item.key}
                isChecked={item.value === welcomeFormdata.studyLevel}
                handleClick={handleclick}
              />
            ))}
          </IonGrid>
        </IonGrid>
      </div>
    </div>
  )
}
export default LevelOfStudy
