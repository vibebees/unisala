import React from "react"
import {
  IonInput,
  IonText,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonButton
} from "@ionic/react"

const CreateListModal = () => {
  return (
    <div className="px-3">
      <IonList>
        <form
          action="
        "
        >
          {" "}
          <IonList>
            <IonText>
              <h2>Name</h2>
            </IonText>
            <IonInput placeholder="List  Name" className="mt-4"></IonInput>{" "}
          </IonList>
          <IonList className="mt-4">
            <IonText>
              <h2>Who can see your Lists ?</h2>
            </IonText>
            <IonRadioGroup className="flex mt-2 flex-col items-start justify-center gap-1 ">
              <IonList className="flex  items-center justify-start gap-2">
                <IonRadio slot="start" />
                <IonText>
                  <p>Public</p>
                </IonText>
              </IonList>
              <IonList className="flex items-center justify-start gap-2">
                <IonRadio slot="start" />
                <IonText>
                  <p>Private</p>
                </IonText>
              </IonList>
            </IonRadioGroup>
          </IonList>
          <IonButton
            className="mt-4 h-10 text-base capitalize"
            expand="block"
            type="submit"
            color="primary"
          >
            Create
          </IonButton>
        </form>
      </IonList>
    </div>
  )
}

export default CreateListModal
