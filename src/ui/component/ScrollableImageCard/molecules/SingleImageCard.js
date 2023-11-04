import React from "react"
import { IonCard } from "@ionic/react"
import CardImage from "../atoms/CardImage"
import CardText from "../atoms/CardText"

const SingleImageCard = ({ allProps }) => {
  const {name, pictures: image, defaultImage = "https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg"} = allProps

  return (
    <IonCard class="shrink-0">
      <CardImage image={image || defaultImage} />
      <CardText name={name} />
    </IonCard>
  )
}

export default SingleImageCard
