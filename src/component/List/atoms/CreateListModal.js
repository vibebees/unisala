import React, { useContext } from "react"
import {
  IonInput,
  IonText,
  IonList,
  IonTextarea,
  IonButton,
  useIonToast
} from "@ionic/react"
import axios from "axios"
import { userServer } from "servers/endpoints"
import { authInstance } from "api/axiosInstance"
import { ListContext } from ".."

const CreateListModal = () => {
  const { setLists, lists } = useContext(ListContext)
  const [present, dismiss] = useIonToast()
  const [input, setInput] = React.useState({
    title: "",
    description: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.title.trim() || !input.description.trim()) {
      return present({
        duration: 3000,
        message: "Empty fields!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
    const res = await authInstance.post(`${userServer}/add-list`, input)
    if (res.data.success) {
      setLists([...lists, res.data.data])
      present({
        duration: 3000,
        message: "List created!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "success",
        mode: "ios"
      })
      const btn = document.querySelector(".modal-close-btn")
      btn.click()
    }
  }

  return (
    <div className="px-3">
      <IonList>
        <form onSubmit={handleSubmit}>
          {" "}
          <IonList>
            <IonText>
              <h2>Name</h2>
            </IonText>
            <IonInput
              placeholder="List  Name"
              className="mt-4 rounded-md"
              type="text"
              name="title"
              onIonChange={(e) => {
                setInput((pre) => {
                  return { ...pre, title: e.target.value }
                })
              }}
            ></IonInput>{" "}
          </IonList>
          <IonList className="mt-4">
            <IonText>
              <h2>A short description </h2>
            </IonText>
            <IonTextarea
              placeholder="Description"
              className="mt-4 rounded-md"
              onIonChange={(e) => {
                setInput((pre) => {
                  return { ...pre, description: e.target.value }
                })
              }}
              rows={5}
            ></IonTextarea>{" "}
          </IonList>
          <IonButton
            className="mt-4 h-10 text-base capitalize modal-close-button"
            expand="block"
            type="submit"
            color="primary"
            onSubmit={handleSubmit}
          >
            Create
          </IonButton>
        </form>
      </IonList>
    </div>
  )
}

export default CreateListModal
