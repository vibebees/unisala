// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent
} from "@ionic/react"

function UnisalaIntro() {
  return (
    <div style={{ margin: "27px 0px 0px 0px" }}>
        <IonCard className="mb-1">
            <IonCardContent className="flex-column text-center">
                <h1 className="pt-1 pb-05 black-text">Explore universities across the globe</h1>
                <p>Your research need not include tens of browser tabs when you can surf through 2000+ universities abroad, all in one place. We have also made it more convenient for you with easy filters and sort options!</p>
                <img src="https://yocket.com/svgs/ExploreUniversityIllustration.svg" alt=""/>
            </IonCardContent>
        </IonCard>

        <IonCard className="mb-1">
            <IonCardContent className="flex">
                <div>
                    <h1 className="pt-1 pb-05 black-text">Connect with aspirants like you!</h1>
                    <p>Your research need not include tens of browser tabs when you can surf through 2000+ universities abroad, all in one place. We have also made it more convenient for you with easy filters and sort options!</p>
                </div>
                <img src="https://d15gkqt2d16c1n.cloudfront.net/images/dashboard/homepage/my-community.png" width="250px" alt=""/>
            </IonCardContent>
        </IonCard>
    </div>
  )
}

export default UnisalaIntro
