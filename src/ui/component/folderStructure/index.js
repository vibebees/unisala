import React from "react"
import { IonCard, IonCardContent, IonGrid, IonRouterLink } from "@ionic/react"
import { Folder } from "./template"
import { Link } from "react-router-dom"

export const FolderStructure = ({ allProps = {} }) => {
  const { folderName = "", customStyles = {}, data = [] } = allProps

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <h2 className="font-normal border-b border-neutral-300 text-neutral-700 px-2 text-lg py-2">
        {folderName}
      </h2>
      <IonCardContent key={"index"} class="w-full ">
        <IonGrid className="w-full gap-3  flex flex-wrap">
          {data?.map((item, index) => {
            // If routing is enabled in the config, wrap the Folder with IonRouterLink
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

            return item?.routing && item.link ? ( // If routing is true and item has a link
              <Link to={item.link}>{renderedFolder}</Link>
            ) : (
              renderedFolder
            )
          })}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}
