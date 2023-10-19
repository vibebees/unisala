import React, { useState } from "react"

import { IonCard, IonCardContent, IonGrid, IonCol, IonRow } from "@ionic/react"
import { Folder } from "./template"

import { Link } from "react-router-dom"
import CardHeader from "ui/component/Reusable/cardHeader"
import { FolderGeneral } from "./organisms/folder"

export const FolderStructure = ({ allProps = {} }) => {
  const { folderName = "", customStyles = {}, data = [] } = allProps
  const [popup, setPopup] = useState(false)
  const [currentURL, setCurrentURL] = useState("")

  const handleItemClick = (item) => {
    if (item.key === "interviewPrep") {
      setCurrentURL(item.link)
      setPopup(true)
    }
  }

  return (
    <IonCard style={{ margin: "10px 0px 0px 0px" }} className="flex flex-col">
      <CardHeader header={folderName} />
      <IonCardContent key={"index"} className="w-full">
        <IonGrid className="w-full gap-3 flex flex-wrap">
          <IonRow>
            {data?.map((item, index) => {
              // If routing is enabled in the config, wrap the Folder with IonRouterLink or Link
              const renderedFolder = (
                <Folder
                  key={index}
                  allProps={item}
                  className="w-full"
                  style={{
                    flex: "1 1 40%",
                    ...customStyles
                  }}
                />
              )

              // If the key is 'interviewPrep', then open the link in a new tab.
              if (item.key === "interviewPrep") {
                return (
                  <IonCol key={index}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {renderedFolder}
                    </a>
                  </IonCol>
                )
              }

              // If routing is enabled but the key isn't 'interviewPrep', then use the Link component.
              return (
                <IonCol key={index}>
                  {item?.routing && item.link ? (
                    <Link to={item.link}>{renderedFolder}</Link>
                  ) : (
                    renderedFolder
                  )}
                </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}
