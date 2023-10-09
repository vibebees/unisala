import React from "react"
import { IonGrid, IonRow, IonCol } from "@ionic/react"
import LibrariesCard from "../atoms/LibrariesCard"
import AdmissionCard from "../atoms/AdmissionCard"
import clsx from "clsx"

const AdmissionEmployees = ({ data }) => {
  return (
    <IonGrid className="py-0 px-0">
      <IonRow className="grid  px-0">
        {[
          {
            title: " Men",
            value: `${data?.men}`,
            image:
              "https://png.pngtree.com/png-vector/20221124/ourmid/pngtree-profile-boy-background-internet-vector-png-image_34761262.png"
          },
          {
            title: " Women",
            value: `${data?.women}`,
            image:
              "https://png.pngtree.com/png-vector/20220326/ourmid/pngtree-woman-avatar-in-green-and-blue-colors-logo-and-flat-icon-vector-png-image_24086894.png"
          },
          {
            title: "Total Students",
            value: `${data?.total}`,
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNV112vuR-JpvBOkqCOz2wAyGUAFoWrZqRgw&usqp=CAU"
          }
        ].map((item, index) => {
          return (
            <IonCol
              key={index}
              style={{
                backgroundColor: "white"
              }}
              className={clsx(
                "ion-padding py-2 max-lg:px-1 ",
                index === 2 && "col-span-2"
              )}
            >
              <AdmissionCard {...item} />
            </IonCol>
          )
        })}
      </IonRow>
    </IonGrid>
  )
}

export default AdmissionEmployees
