import {
  IonButton,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea
} from "@ionic/react"
import React, { useState } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"

const Form = ({ metaData }) => {
  const generateInputTag = (item) => {
    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        <IonInput name={item.name} className="w-1/2" onIonChange={(e) => {}} />
      </>
    )
  }
  const generateSelectTag = (item) => {
    const [selected, setSelected] = useState(null)

    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        <IonSelect
          className="w-1/2"
          onIonChange={(e) => setSelected(e.target.value)}
        >
          {item.options.map((item, i) => (
            <IonSelectOption value={item} key={`${item}-i`}>
              {item}
            </IonSelectOption>
          ))}
        </IonSelect>
      </>
    )
  }
  const generateTextareaTag = (item) => {
    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        <ReactQuill className="h-40 mb-12 text-black relative" theme="snow" />
      </>
    )
  }
  const generateHTML = (item) => {
    console.log({ item })
    switch (item?.type) {
      case "input":
        return generateInputTag(item)
      case "select":
        return generateSelectTag(item)
      case "textarea":
        return generateTextareaTag(item)
      default:
        return null
    }
  }

  return (
    <div className="px-2">
      <form>
        {metaData.edges.map((item) => (
          <>
            <div className="mt-4">{generateHTML(item)}</div>
          </>
        ))}
        <IonButton type="submit">Submit</IonButton>
      </form>
    </div>
  )
}

export default Form
