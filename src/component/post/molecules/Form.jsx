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
  // this into {0: "", 1: ""}
  const [selected, setSelected] = useState({})

  const generateInputTag = (item) => {
    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        <IonInput name={item.name} className="w-1/2" onIonChange={(e) => {}} />
      </>
    )
  }
  const generateSelectTag = (item) => {
    console.log({ asa: item.conditionalEdges?.[selected] })
    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        <IonSelect
          className="w-1/2"
          onIonChange={
            (e) =>
              setSelected((prev) => ({ ...prev, [item.id]: e.target.value }))
            // generateHTML(item.conditionalEdges?.[e.target.value]?.[0])
          }
        >
          {item.options.map((item, i) => (
            <IonSelectOption value={item} key={`${item}-i`}>
              {item}
            </IonSelectOption>
          ))}
        </IonSelect>
        {/* {Object.keys(selected).length > 0 &&
          Object.values(selected).map((val) =>
            generateHTML(item?.conditionalEdges?.[val]?.[0])
          )} */}
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
