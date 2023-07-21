import React, {useEffect} from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonText,
  IonItem,
  IonLabel
} from "@ionic/react"
import {heart, saveOutline, location, shareOutline} from "ionicons/icons"
import useIsData from "../../../hooks/useIsData"
import useGrade from "../../../hooks/useGrade"
import useGradeColor from "../../../hooks/useGradeColor"
import "./index.css"
import {getImage, universityDefaultImage} from "../../../servers/s3.configs"

const CourseCard = ({
  picture,
  name,
  city,
  rating,
  review,
  average,
  acceptanceRate,
  act,
  data
}) => {
  const
    [width, setWidth] = React.useState(window.innerWidth),
    [images, setImages] = React.useState(picture)

  const handleResize = () => {
    const {innerWidth} = window

    if (width !== innerWidth) {
      setWidth(innerWidth)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })
  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol
            style={{
              margin: "auto"
            }}
            size={"auto"}
          >
            <div className="card-image">
              <img
                src={
                  images?.[0] || universityDefaultImage
                }
                alt="University"
                style={{
                  width: "250px",
                  height: "200px",
                  objectFit: "cover",
                  margin: "auto"
                }}
              />
              <div className="card-recommend sort-tag">
                <p
                  style={{
                    margin: 0
                  }}
                >
                  Recommended
                </p>
              </div>
            </div>
          </IonCol>
          <IonCol
            style={{
              minWidth: width > 400 && "320px"
            }}
          >
            <IonRow>
              <IonCol>
                <div
                  style={{
                    display: "flex",
                    float: "right"
                    // justifyContent: "flex-end"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px"
                    }}
                  >
                    <IonIcon
                      style={{
                        fontSize: "25px"
                      }}
                      icon={shareOutline}
                    />
                    <IonIcon
                      style={{
                        fontSize: "25px"
                      }}
                      icon={saveOutline}
                    />
                  </div>
                </div>
                <IonText color="dark">
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      margin: "0"
                    }}
                  >
                    {useIsData(name)}
                  </h1>
                </IonText>

                <IonRow
                  style={{
                    margin: "0",
                    padding: "0"
                  }}
                >
                  <IonCol
                    style={{
                      margin: 0,
                      padding: 0
                    }}
                    size="auto"
                  >
                    <IonItem
                      className="ion-no-padding"
                      style={{
                        margin: "0",
                        padding: "0"
                      }}
                      lines="none"
                    >
                      <IonIcon
                        style={{
                          fontSize: "20px",
                          alignSelf: "center"
                        }}
                        className="ion-icon"
                        icon={location}
                      />
                      <IonLabel className="ion-padding-start">
                        <p
                          style={{
                            alignSelf: "center",
                            margin: 0
                          }}
                        >
                          {useIsData(city)}
                        </p>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol
                    style={{
                      margin: 0,
                      padding: 0
                    }}
                    className=""
                    size="auto"
                  >
                    <IonItem className="ion-no-padding" lines="none">
                      <IonIcon
                        style={{
                          fontSize: "20px",
                          alignSelf: "center"
                        }}
                        className="ion-icon"
                        icon={heart}
                        color="danger"
                      />
                      <IonLabel className="ion-padding-start">
                        <p
                          style={{
                            alignSelf: "center",
                            margin: 0
                          }}
                        >
                          {`${useIsData(rating)} . ${useIsData(review)} `}
                          <u>reviews</u>
                        </p>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow
                  style={{
                    gap: "10px",
                    marginTop: "20px"
                  }}
                >
                  <IonCol
                    size="auto"
                    style={{
                      margin: "auto",
                      textAlign: "center"
                    }}
                  >
                    <div
                      style={{
                        background: useGradeColor(average),
                        margin: "auto"
                        // marginBottom: "10px"
                      }}
                      className="card-report"
                    >
                      <h6
                        style={{
                          fontSize: width > 800 ? "14px" : "12px",
                          margin: "0"
                        }}
                      // style={{ fontSize: "16px" }}
                      >
                        {useGrade(average)}
                      </h6>
                    </div>
                    <IonText color="dark">
                      <h6
                        style={{
                          fontSize: width > 800 ? "14px" : "12px"
                        }}
                      >
                        Average Rating
                      </h6>
                    </IonText>
                  </IonCol>

                  <IonCol
                    size="auto"
                    style={{
                      margin: "auto",
                      textAlign: "center"
                    }}
                  >
                    <div
                      style={{
                        margin: "auto",
                        marginBottom: "10px"
                      }}
                    >
                      <h6
                        style={{
                          fontSize: width > 800 ? "18px" : "12px"
                        }}
                      // style={{ fontSize: "16px" }}
                      >
                        {useIsData(acceptanceRate)}
                      </h6>
                    </div>
                    <IonText color="dark">
                      <h6
                        style={{
                          fontSize: width > 800 ? "14px" : "12px"
                        }}
                      >
                        Acceptance Rate
                      </h6>
                    </IonText>
                  </IonCol>
                  <IonCol
                    size="auto"
                    style={{
                      margin: "auto",
                      textAlign: "center"
                    }}
                  >
                    <div
                      style={{
                        margin: "auto",
                        marginBottom: "10px"
                      }}
                    >
                      <h6
                        style={{
                          fontSize: width > 800 ? "18px" : "12px"
                        }}
                      // style={{ fontSize: "16px" }}
                      >
                        {useIsData(act?.min) + "-" + useIsData(act?.max)}
                      </h6>
                    </div>
                    <IonText color="dark">
                      <h6
                        style={{
                          fontSize: width > 800 ? "14px" : "12px"
                        }}
                      >
                        ACT Range
                      </h6>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  )
}
export default CourseCard
