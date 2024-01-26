import { IonButton, IonCard } from "@ionic/react"
import clsx from "clsx"
import React, { useEffect } from "react"
import { useHistory } from "react-router"

const Tabs = () => {
  const params = new URLSearchParams(window.location.search)
  const history = useHistory()
  const q = params.get("tab")
  const setParams = (q) => {
    params.set("tab", q)
    history.push({
      search: params.toString()
    })
  }
  return (
    <div className="flex w-1/2 mx-auto">
      <IonButton
        className="flex-1"
        fill={q === "g" ? "solid" : "outline"}
        onClick={() => setParams("g")}
      >
        General
      </IonButton>
      <IonButton
        className="flex-1"
        onClick={() => setParams("r")}
        fill={q === "r" ? "solid" : "outline"}
      >
        Reviews
      </IonButton>
    </div>
  )
}

export default Tabs
