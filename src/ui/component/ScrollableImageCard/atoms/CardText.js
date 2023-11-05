import { IonText } from "@ionic/react"
import React from "react"

const CardText = ({ name }) => {
  return (
    <p className="!w-48 px-4   text-center py-2 text-neutral-800 overflow-hidden break-words">
      {name}
    </p>
  )
}

export default CardText
