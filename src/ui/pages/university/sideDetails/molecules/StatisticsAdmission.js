import React from "react"
import useIsData from "../../../../../hooks/useIsData"
import { IonText, IonGrid, IonRow, IonCol, IonCardContent } from "@ionic/react"
import TotalCard from "../atoms/TotalCard"

const StatisticsAdmission = ({ data }) => {
  return (
    <>
      <IonCardContent>
        <IonText color="dark">
          <h2>Enrolled Student</h2>
        </IonText>
        <IonGrid>
          <IonRow>
            {[
              {
                title: "Total Graduate",
                value: `${useIsData(data.graduateEnrollment)}`,
                image: "https://cdn-icons-png.flaticon.com/512/7389/7389814.png"
              },
              {
                title: "Total Enrolled",
                value: `${useIsData(data.totalEnrollment)}`,
                image: "https://cdn-icons-png.flaticon.com/512/2534/2534204.png"
              },
              {
                title: "Total Undergraduate",
                value: `${useIsData(data.undergraduateEnrollment)}`,
                image: "https://cdn-icons-png.flaticon.com/512/7156/7156208.png"
              }
            ].map((item, index) => {
              return (
                <IonCol
                  // size="auto"
                  key={index}
                  style={{
                    alignSelf: "center",
                    margin: "5px",
                    padding: 0
                  }}
                  className="ion-padding"
                >
                  <TotalCard {...item} />
                </IonCol>
              )
            })}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </>
  )
}

export default StatisticsAdmission
