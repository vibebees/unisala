import React, { useState } from "react"
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonRadio,
  IonRadioGroup,
  IonInput,
  IonItem
} from "@ionic/react"

import TimeLineTemp from "./template"
// import StepInput from "../../component/roadmap/StepInput"
import { createAvatar } from "@dicebear/core"
import { thumbs } from "@dicebear/collection"
import SingleTimeline from "./organism/SingleTimeline"

export const TimeLine = () => {
  const [firstStep, setfirstStep] = useState(true)
  const [data, setdata] = useState({
    stepOne: "",
    stepTwo: "",
    stepThree: "",
    stepFour: ""
  })

  return (
    <IonGrid style={{ maxWidth: "900px" }} className="w-full">
      <SingleTimeline />
    </IonGrid>
  )
}
