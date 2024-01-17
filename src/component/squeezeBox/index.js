import React, { useEffect, useRef } from "react"
import {
  IonAccordion,
  IonAccordionGroup,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea
} from "@ionic/react"
import "./index.css"
import { StudyAbroadRoadmapInput } from "features/roadmap/template"
export const SqueezeBox = ({ data }) => {
  const accordionGroup = useRef(null)
  useEffect(() => {
    if (!accordionGroup.current) {
      return
    }

    accordionGroup.current.value = ["2024"]
  }, [])
  return (
    <IonAccordionGroup
      className="ion-no-margin ion-no-padding w-full "
      ref={accordionGroup}
      expand="inset"
    >
      {data.map((item, index) => (
        <IonAccordion
          className="ion-no-margin ion-no-padding "
          value={item.title}
          key={index}
        >
          <IonItem slot="header">
            <IonLabel>{item.title}</IonLabel>
          </IonItem>
          <div className="ion-no-padding " slot="content">
            {/* {item.content} */}

            {item.child}
            {/* <IonTextarea value={item.content} style={{ height: "300px" }} /> */}
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  )
}
