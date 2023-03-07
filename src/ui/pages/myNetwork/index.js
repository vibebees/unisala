// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react"
import useWindowWidth from "../../../hooks/useWindowWidth"
import Sidebar from "./sidebar"
import Requests from "./requests"
import Recommendations from "./recommendations"
import useDocTitle from "../../../hooks/useDocTitile"

function index() {
  useDocTitle("My Network")
  const windowWidth = useWindowWidth()
  return (
    <IonContent>
      <IonGrid className="max-width-container">
        <IonRow>
          {windowWidth > 768 && (
            <IonCol className="filter-col" style={{ maxWidth: "400px" }}>
              <div className="filter-col-container">
                <Sidebar />
              </div>
            </IonCol>
          )}

          <IonCol className="results-col">
            <Requests />
            <Recommendations />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default index
