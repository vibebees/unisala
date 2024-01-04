import React, { useState } from "react"
import { authInstance } from "api/axiosInstance"
import { userServer } from "servers/endpoints"
import {
  ellipsisVerticalOutline,
  pinOutline,
  pencilOutline,
  trashOutline,
  closeOutline
} from "ionicons/icons"
import { IonIcon, IonActionSheet, useIonToast } from "@ionic/react"

const ActionButton = ({ _id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [present, dismiss] = useIonToast()

  const deleteList = async () => {
    const res = await authInstance.delete(`${userServer}/delete-list/${_id}`)
    if (res.data.success) {
      console.log(res.data)
    } else {
      console.log(res.data)
    }
  }

  const handleAction = (action) => {
    return async () => {
      switch (action) {
        case "pin":
          break
        case "edit":
          break
        case "delete":
          await deleteList()
          break
        case "cancel":
          break
        default:
          break
      }
    }
  }
  return (
    <div>
      <IonIcon
        onClick={() => setIsOpen(true)}
        id="open-action-sheet"
        className="text-xl border p-1 opacity-0 active:opacity-100 focus:opacity-100 active:bg-neutral-100 group-hover:opacity-100 duration-200 transition-opacity ease-linear rounded-full border-neutral-300 cursor-pointer"
        icon={ellipsisVerticalOutline}
      />

      <IonActionSheet
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        header="List Actions"
        buttons={[
          {
            text: "Pin List",
            icon: pinOutline,
            data: {
              action: "pin"
            }
          },
          {
            text: "Edit List",
            icon: pencilOutline,
            data: {
              action: "delete"
            }
          },
          {
            text: "Delete List",
            role: "destructive",
            icon: trashOutline,
            data: {
              action: handleAction("delete")
            }
          },

          {
            text: "Cancel",
            role: "cancel",
            icon: closeOutline,
            data: {
              action: "cancel"
            }
          }
        ]}
      ></IonActionSheet>
    </div>
  )
}

export default ActionButton
