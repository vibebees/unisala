import React, { useState } from "react"
import {
  ellipsisVerticalOutline,
  pinOutline,
  pencilOutline,
  trashOutline,
  closeOutline
} from "ionicons/icons"
import { IonIcon, IonActionSheet } from "@ionic/react"

const ActionButton = () => {
  const [isOpen, setIsOpen] = useState(false)
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
              action: "delete"
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
              action: "delete"
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
