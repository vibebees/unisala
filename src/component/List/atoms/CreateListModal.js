import React from "react"
import {
  IonInput,
  IonText,
  IonList,
  IonTextarea,
  IonButton
} from "@ionic/react"
import axios from "axios"

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
            <IonInput
              placeholder="List  Name"
              className="mt-4 rounded-md"
            ></IonInput>{" "}
          </IonList>
          <IonList className="mt-4">
            <IonText>
              <h2>A short description </h2>
            </IonText>
            <IonTextarea
              placeholder="Description"
              className="mt-4 rounded-md"
              rows={5}
            ></IonTextarea>{" "}
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
