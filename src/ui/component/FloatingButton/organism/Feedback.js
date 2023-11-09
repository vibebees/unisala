import React, { useState } from "react"
import { IonContent } from "@ionic/react"
import Rating from "../molecules/Rating"
import FeebackText from "../molecules/FeebackText"

const Feedback = () => {
  const [feedBack, Setfeedback] = useState({
    rating: null,
    feedbackText: "",
    email: ""
  })

  let allProps = {
    feedBack,
    Setfeedback
  }

  return (
    <IonContent>
      <Rating allProps={allProps} />
      <FeebackText allProps={allProps} />
    </IonContent>
  )
}

export default Feedback
