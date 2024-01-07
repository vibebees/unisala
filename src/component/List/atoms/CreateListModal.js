import React, { useContext } from "react"
import {
  IonInput,
  IonText,
  IonList,
  IonTextarea,
  IonButton,
  useIonToast,
  IonSpinner
} from "@ionic/react"
import axios from "axios"
import { userServer } from "servers/endpoints"
import { authInstance } from "api/axiosInstance"
import { ListContext } from ".."

const CreateListModal = ({ editList = false, list }) => {
  const { setLists, lists } = useContext(ListContext)
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState({
    title: editList ? list.title : "",
    description: editList ? list.description : ""
  })

  const handleEdit = async () => {
    if (input.title === list.title && input.description === list.description) {
      return present({
        duration: 3000,
        message: "No changes made!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }

    const res = await authInstance.patch(
      `${userServer}/update-list/${list._id}`,
      {
        title: input.title,
        description: input.description
      }
    )
    if (res.data.success) {
      setLists((prev) =>
        prev.map((list) => {
          if (list._id === res.data.data._id) {
            return res.data.data
          }
          return list
        })
      )
      present({
        duration: 3000,
        message: "List updated!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "success",
        mode: "ios"
      })
      const btn = document.querySelector(".modal-close-btn")
      btn.click()
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    setLoading(true)
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
    if (editList) {
      return handleEdit()
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
    setLoading(false)
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
              value={input.title}
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
              value={input.description}
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
            disabled={loading}
            onSubmit={handleSubmit}
          >
            {editList ? "Save changes" : "Create List"}{" "}
            {loading && <IonSpinner name="lines-small"></IonSpinner>}
          </IonButton>
        </form>
      </IonList>
    </div>
  )
}

export default CreateListModal
