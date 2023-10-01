import React from "react"
import {
  IonGrid,
  IonText,
  IonIcon
} from "@ionic/react"
import { personCircleOutline, happyOutline, schoolOutline, searchCircleOutline } from "ionicons/icons"
import styles from "./index.css"

const FirstStep = () => {

return (
    <div className="flex flex-col h-full justify-between">
      <IonGrid className="mx-4 md:mx-2 mt-12 md:mt-9">
        <IonGrid>
          <IonText color="primary">
          <h1 className={`font-bold text-2xl md:text-xl text-center mt-5 text-neutral-600 ${styles.fadeIn}`}>
              let&apos;s  get started! <span className="shiny">🙂</span>
          </h1>

          <IonIcon icon={personCircleOutline} size="large" className={`mx-auto my-4 ${styles.zoomIn} transform transition-transform duration-300 hover:scale-105 slide-in`} />

        <p className={`text-base md:text-sm max-md:mx-5 leading-7 text-center mt-7 font-normal text-neutral-500 mx-14 slide-in`}>
            Welcome to <strong>Unisala</strong>! 🚀 Here&apos;s what you can expect:
            <ul className="list-disc list-inside mt-3">
                <li className="slide-in-1"><IonIcon icon={personCircleOutline} /> <strong>Customize</strong> your profile.</li>
                <li className="slide-in-2"><IonIcon icon={schoolOutline} /> Tell us about your <strong>educational journey</strong>.</li>
                <li className="slide-in-3"><IonIcon icon={searchCircleOutline} /> <strong>Explore</strong> what we have to offer.</li>
            </ul>
            It&apos;s simple and quick. Dive right in! 🏊‍♂️
        </p>

          </IonText>
        </IonGrid>
      </IonGrid>
    </div>
  )
}

export default FirstStep
