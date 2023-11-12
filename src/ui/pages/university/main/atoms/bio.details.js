// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonList
} from "@ionic/react"
import { heart, location } from "ionicons/icons"
import useRating from "../../../../../hooks/useRating"
import Modal from "ui/component/Reusable/Modal"
import SeeMoreButton from "ui/component/Reusable/Buttons/SeeMoreButton"
import ListItemValue from "ui/component/Reusable/ListValueItem"

export const BioDetails = ({ allProps }) => {
  const { width, uniData, handleResize } = allProps

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  const ModalData = (
    <div>
      <IonList>
        <ListItemValue label={"Name"} value={uniData?.elevatorInfo?.name} />
        <ListItemValue label={"Bio"} value={uniData?.elevatorInfo?.bio} />
        <ListItemValue
          label={"Address"}
          value={uniData?.elevatorInfo?.briefAddress}
        />
        <ListItemValue
          label={"Calender System"}
          value={uniData?.elevatorInfo?.calendar}
        />
        <ListItemValue
          label={"Graduate offered"}
          value={uniData?.elevatorInfo?.graduateOffering}
        />
        <ListItemValue
          label={"Grants Medical Degree"}
          value={uniData?.elevatorInfo?.grantsMedicalDegree}
        />
        <ListItemValue
          label={"Has Hospital"}
          value={uniData?.elevatorInfo?.hasHospital}
        />
        <ListItemValue
          label={"Highest Degree Offered"}
          value={uniData?.elevatorInfo?.highestLevelOfOffering}
        />
        <ListItemValue
          label={"University Type"}
          value={uniData?.elevatorInfo?.ownType}
        />
        <ListItemValue
          label={"Undergraduate offered"}
          value={uniData?.elevatorInfo?.undergraduateOffering}
        />
      </IonList>
    </div>
  )

  return (
    <IonGrid className={width > 720 ? "ion-padding" : ""}>
      <IonRow>
        <IonCol>
          <IonCardHeader className="UniProfile-Header">
            <h1 className="font-medium text-lg">
              {uniData?.elevatorInfo?.name}
            </h1>
          </IonCardHeader>

          <IonCardContent>
            <p
              style={{
                maxWidth: "800px",
                minWidth: "250px"
              }}
            >
              {uniData?.elevatorInfo?.bio}
            </p>
          </IonCardContent>
          <div className="inline-flex">
            <IonCardContent style={{ display: "flex", padding: "0 12px" }}>
              <IonIcon
                style={{
                  fontSize: "20px",
                  alignSelf: "center"
                }}
                className="ion-icon"
                icon={location}
              />
              <p style={{ alignSelf: "center" }}>
                {uniData?.elevatorInfo?.address?.city}
              </p>
            </IonCardContent>
            <IonCardContent style={{ display: "flex", padding: "0 12px" }}>
              <IonIcon
                style={{
                  fontSize: "20px",
                  alignSelf: "center"
                }}
                color="danger"
                className="ion-icon"
                icon={heart}
              />
              <p style={{ alignSelf: "center" }}>
                {useRating(uniData?.reviews || []) || "N/A"} Review
              </p>
            </IonCardContent>
            <IonCardContent style={{ display: "flex", padding: "0 12px" }}>
              {/* <p style={{ alignSelf: "center" }}>See more </p> */}
              <Modal
                ModalButton={<SeeMoreButton />}
                ModalData={ModalData}
                header="About"
              />
            </IonCardContent>
          </div>
        </IonCol>
        {/* <IonCol
                    size="auto"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "auto"
                    }}
                    className="ion-padding"
                >
                    <section
                        style={{
                            width: "250px",
                            margin: "auto"
                        }}
                    >
                        <section style={{ display: "flex" }}>
                            <IonCol>
                                <IonButton
                                    color="light"
                                    style={{ width: "100%" }}
                                >
                                    <IonIcon
                                        color="dark"
                                        className="padding-lg"
                                        icon={share}
                                    />
                                    {"  "}
                                    <IonLabel className="ion-padding-start">
                                        Share
                                    </IonLabel>
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton
                                    color="light"
                                    style={{ width: "100%" }}
                                >
                                    <IonIcon icon={heart} />
                                    {"  "}

                                    <IonLabel className="ion-padding-start">
                                        Save
                                    </IonLabel>
                                </IonButton>
                            </IonCol>
                        </section>
                        <IonButton style={{ width: "100%" }}>
                            <p>Easy Apply</p>
                        </IonButton>
                    </section>
                </IonCol> */}
      </IonRow>
    </IonGrid>
  )
}
