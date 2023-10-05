// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow
} from "@ionic/react"
import { heart, location, ellipsisVerticalCircleOutline } from "ionicons/icons"
import { useSelector } from "react-redux"
import useRating from "../../../../../hooks/useRating"
import SeeMoreModal from "../molecules/SeeMoreModal"

export const BioDetails = ({ allProps }) => {
  const { width, setWidth, uniData, handleResize } = allProps

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  const ModalButton = (
    <IonIcon
      style={{
        fontSize: "22px",
        alignSelf: "center"
      }}
      className="ion-icon"
      icon={ellipsisVerticalCircleOutline}
    />
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
              <SeeMoreModal ModalButton={ModalButton} />
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
