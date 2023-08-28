import React from "react"
import {
  IonGrid,
  IonText,
  IonButton,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle
} from "@ionic/react"
import SecondStep from "./SecondStep"
import Indicators from "./Indicators"

const FirstStep = () => {
  return (
    <div>
      <IonGrid className="mx-4 mt-12">
        <IonGrid>
          <IonText color="primary">
            <h1 className="font-bold text-2xl text-center mt-5 text-neutral-600">
              Welcome to Vibes Bee
            </h1>
            <p className=" text-base leading-7 text-center mt-7 font-normal text-neutral-500 mx-14">
              We are thrilled to have you join us on your journey towards
              studying abroad and achieving your academic dreams. At Vibes Bee,
              we are dedicated to guiding and supporting students like you
              through every step of the process.
            </p>
          </IonText>
        </IonGrid>
      </IonGrid>
    </div>
  )
}

export default FirstStep
