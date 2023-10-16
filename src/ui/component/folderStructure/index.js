import React, {useEffect, useState} from "react"
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow
} from "@ionic/react"
import { Folder, FolderScholarship } from "./organisms/sch.folder"
import { Link } from "react-router-dom"
import { FolderGeneral } from "./organisms/folder"

// Create a function to render a folder based on conditions
const RenderFolder = ({ item, allProps, customStyles, popUp }) => {
  const ComponentToRender = popUp ? FolderScholarship : FolderGeneral
  return (
    <ComponentToRender
      allProps={allProps}
      item={item}
      className="w-full"
      style={{ flex: "1 1 40%", ...customStyles }}
    />
  )
}
export const FolderStructure = ({ allProps = {} }) => {
  const { folderName = "", customStyles = {} } = allProps
  const [popup, setPopup] = useState(false)
  const [currentURL, setCurrentURL] = useState("")

  const handleItemClick = (item) => {
    if (item.key === "interviewPrep") {
      setCurrentURL(item.link)
      setPopup(true)
    }
  }
  const [data, setData] = useState(allProps?.data || [])

  useEffect(() => {
    setData(allProps?.data || [])
  }, [allProps?.data])
  return (
    <IonCard style={{ margin: "10px 0px 0px 0px" }} className="flex flex-col">
      <h2 className="font-normal border-b border-neutral-300 text-neutral-700 px-2 text-lg py-2">
        {folderName}
      </h2>
      <IonCardContent key={"index"} className="w-full">
        <IonGrid className="w-full gap-3 flex flex-wrap">
          <IonRow>
            {data.map((item, index) => (
              <IonCol key={index}>
                {item.key === "interviewPrep" ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <RenderFolder {...{ item, allProps, customStyles, popUp }} />
                  </a>
                ) : popUp ? (
                  <RenderFolder {...{ item, allProps, customStyles, popUp }} />
                ) : (
                  <Link to={item.link}>
                    <RenderFolder {...{ item, allProps, customStyles, popUp }} />
                  </Link>
                )}
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}
