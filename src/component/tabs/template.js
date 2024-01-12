import React from "react"
import {IonLabel, IonSegment, IonSegmentButton} from "@ionic/react"
import Tabs from "./molecules/tabs"
import {useHistory} from "react-router"

function Example({config}) {
  const history = useHistory()


  return (<Tabs props={config} />
  )
}
export default Example
