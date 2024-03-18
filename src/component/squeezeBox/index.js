import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel
} from "@ionic/react"
import { TimeLine } from "component/timeline"
import { useEffect, useRef } from "react"

import "./index.css"
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

            <TimeLine data={item.child} />
            {/* <IonTextarea value={item.content} style={{ height: "300px" }} /> */}
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  )
}
