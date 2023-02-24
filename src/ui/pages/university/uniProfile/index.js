// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard } from "@ionic/react"
import CoverImg from "./CoverImg"
import "./UniProfile.css"
import ProDetails from "./ProDetails"

const UniProfile = () => {
    return (
        <IonCard style={{ margin: 0 }} className="">
            <CoverImg />
            <ProDetails />
        </IonCard>
    )
}
export default UniProfile
