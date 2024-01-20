import React, { useState } from "react"
import { IonButton, IonInput, IonCard } from "@ionic/react"
import SendButton from "./SendButton"
import InvitationTypesCheckbox from "../organism/InvitationTypesCheckbox"

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [invitationType, setInvitationType] = React.useState("")

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Selected file:", selectedFile)
    } else {
      console.log("No file selected")
    }
  }
  return (
    <div className="w-full h-full">
      <IonCard className="ion-no-margin  ion-no-padding shadow-none px-4 py-6">
        <input
          type="file"
          className="border-2 border-neutral-300 rounded-lg p-2 w-full"
          accept=".xls, .xlsx"
          onChange={handleFileChange}
        />
        <InvitationTypesCheckbox
          allProps={{
            invitationType,
            setInvitationType,
            admin: true
          }}
        />
        <SendButton label="Send Invitation" onclick={handleUpload} />
      </IonCard>
    </div>
  )
}

export default FileUploader
