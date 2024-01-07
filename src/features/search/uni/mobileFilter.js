import React, {useEffect, useState} from "react"
import { IonModal, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import Filter from "./Filter"
import {useUniPopup} from "./uniPopupContext"

export const MobileFilter = ({filterPage, setIsLoading, onClose}) => {

    const { popUp, setPopUp, closePopup} = useUniPopup()

    useEffect(() => {
        console.log("popup", popUp)
    }, [popUp])
    return (
        <IonModal isOpen={popUp} onDidDismiss={closePopup}>
        <IonHeader>
            <IonToolbar>
              <IonTitle>Filter</IonTitle>
              <IonButton slot="end" onClick={onClose}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Filter filterPage={filterPage} setIsLoading={setIsLoading} />
          </IonContent>
        </IonModal>
      )

}
