import React, { useEffect, useState } from "react"
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react"
import { FolderScholarship } from "./organisms/sch.folder"
import { Link } from "react-router-dom"
import CardHeader from "ui/component/Reusable/cardHeader"
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
  const [popUp, setPopup] = useState(allProps?.popUp || false)
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

  if (allProps?.data?.length === 0) return null

  useEffect(() => {
    setData(allProps?.data || [])
  }, [allProps?.data])
  return (
    <IonCard style={{ margin: "10px 0px 0px 0px" }} className="flex flex-col">
      <CardHeader header={folderName} />
      <IonCardContent key={"index"} className="w-full">
        <IonGrid className="w-full gap-3 flex flex-wrap">
          <IonRow>
            {data.map((item, index) => (
              <IonCol key={index}>
                {item.key === "interviewPrep" ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <RenderFolder
                      {...{ item, allProps, customStyles, popUp }}
                    />
                  </a>
                ) : popUp ? (
                  <RenderFolder {...{ item, allProps, customStyles, popUp }} />
                ) : (
                  <Link to={item.link}>
                    <RenderFolder
                      {...{ item, allProps, customStyles, popUp }}
                    />
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
