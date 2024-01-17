import React, { useState } from "react"
import { IonButton, IonInput } from "@ionic/react"
import SendButton from "./SendButton"

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)

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
    <div className="flex flex-col">
      <input
        type="file"
        className="border-2 border-neutral-300 rounded-lg p-2 "
        accept=".xls, .xlsx"
        onChange={handleFileChange}
      />
      <SendButton label="Send Invitation" onclick={handleUpload} />
    </div>
  )
}

export default FileUploader
