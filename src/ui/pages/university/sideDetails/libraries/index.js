// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard, IonCardContent, IonGrid, IonCol, IonRow } from "@ionic/react"
import "./Libraries.css"
import Libraries from "../molecules/Libraries"
import { useSelector } from "react-redux"

const index = () => {
  const { uniData } = useSelector((store) => store?.university)
  const data = uniData?.elevatorInfo.library
  return (
    <IonCard
      style={{
        margin: "15px 0px 0px 0px"
      }}
      className="ion-margin-top"
    >
      <IonCardContent
        style={{
          borderBottom: "1px solid #C4C4C4"
        }}
      >
        <h1>Libraries</h1>
      </IonCardContent>
      <IonCardContent>
        <Libraries data={data} />
      </IonCardContent>
    </IonCard>
  )
}
export default index
