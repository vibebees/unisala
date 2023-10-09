// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonCol,
  IonRow,
  IonText
} from "@ionic/react"
import { useSelector } from "react-redux"
import { handleResize } from "../../../utils/screen"
import { RowSection } from "./molecules/rowSection"
export const Template = ({ allProps }) => {
  const { testScores, width, setWidth, isSideBar, useIsData } = allProps

  useEffect(() => {
    window.addEventListener("resize", handleResize({ width, setWidth }))
    return () => {
      window.removeEventListener("resize", handleResize({ width, setWidth }))
    }
  })

  return (
    !isSideBar?.testScoreEmpty && (
      <IonCard
        style={{
          margin: "15px 0px 0px 0px"
        }}
        className="ion-margin-top"
      >
        {Object.keys(testScores).map((item, index) => {
          if (["act", "sat"].includes(item) && testScores[item]) {
            return (
              <RowSection
                allProps={allProps}
                testScore={testScores[item]}
                key={index}
                type={item}
              />
            )
          }
          return ""
        })}
      </IonCard>
    )
  )
}
