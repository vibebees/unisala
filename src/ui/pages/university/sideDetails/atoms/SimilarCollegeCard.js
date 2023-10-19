import React from "react"
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonText,
  IonIcon
} from "@ionic/react"

const SimilarCollegeCard = ({ name }) => {
  return (
    <IonCard class="shrink-0">
      <div className="w-48 h-56">
        <img
          src="https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg"
          alt="college"
          className="h-full w-full object-cover"
        />
      </div>

      <p className="w-48 px-4 text-center py-2 text-neutral-800 overflow-hidden break-words">
        {name}
      </p>
    </IonCard>
  )
}

export default SimilarCollegeCard
