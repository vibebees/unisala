import React from "react"
import { IonGrid, IonRow, IonCol } from "@ionic/react"
import LibrariesCard from "../atoms/LibrariesCard"

const Libraries = ({ data }) => {
  return (
    <>
      <IonGrid>
        <IonRow>
          {[
            {
              title: "Physical Books",
              value: `${data?.physicalBook}`
            },
            {
              title: "Physical Media",
              value: `${data?.physicalMedia}`
            },
            {
              title: "Online Books",
              value: `${data?.digitalElectronicBook}`
            }
          ].map((item, index) => {
            return (
              <IonCol
                key={index}
                style={{
                  backgroundColor: "white"
                }}
                className="ion-padding"
              >
                <LibrariesCard {...item} />
              </IonCol>
            )
          })}
        </IonRow>
      </IonGrid>
    </>
  )
}

export default Libraries
