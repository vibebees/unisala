import React from "react"
import { IonCard, IonImg, IonIcon } from "@ionic/react"
import { closeOutline } from "ionicons/icons"

const DeleteEvent = () => {
  return (
    <div className="bg-neutral-300 hover:bg-neutral-500 duration-300 active:scale-75 w-7 h-7 cursor-pointer  mt-3  mr-3 top-0 right-0 grid place-content-center rounded-full absolute">
      <IonIcon
        className="top-0 right-0 text-xl text-white"
        icon={closeOutline}
      />
    </div>
  )
}

export default DeleteEvent
