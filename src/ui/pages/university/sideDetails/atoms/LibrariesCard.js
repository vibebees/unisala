// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"

import { IonText } from "@ionic/react"
import useIsData from "../../../../../hooks/useIsData"
import useCountConverter from "../../../../../hooks/useCountConverter"

const LibrariesCard = ({ title, value }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="rounded-rectangle">
        <img
          alt=""
          src="https://cdn-icons-png.flaticon.com/512/7398/7398653.png"
          style={{
            width: "60px"
          }}
        />
        <IonText color="dark" className="">
          <h1
            style={{
              fontSize: "30px"
            }}
          >
            {useIsData(value) !== "N/A" && useCountConverter(value) !== "0"
              ? useCountConverter(value) + "+"
              : useIsData(value)}
          </h1>
        </IonText>
        <IonText
          style={{
            textAlign: "center"
          }}
          color="medium"
        >
          <p
            style={{
              fontSize: "16px"
            }}
          >
            {title}
          </p>
        </IonText>
      </div>
    </div>
  )
}
export default LibrariesCard
