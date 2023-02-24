// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonIcon,
  IonModal,
  IonHeader,
  IonButtons,
  IonContent,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  useIonToast,
  IonLabel
} from "@ionic/react"
import { create, eyeOff, eye, add } from "ionicons/icons"
import useWindowWidth from "../../../../../hooks/useWindowWidth"

const TestScore = ({ testScore, myProfile }) => {
  let windowWidth = useWindowWidth()
  const [isOpen, setIsOpen] = useState(false)
  const { scores } = testScore ?? {}
  const [isCardPrivate, setIsCardPrivate] = useState(testScore?.private)
  const [present, dismiss] = useIonToast()
  const [testScoreContent, setTestScoreContent] = useState("")

  const handleTestScoreContent = () => {
    if (testScoreContent === "SAT") {
      return (
        <>
          <h5>SAT Score</h5>
          <div className="mb-1">
            <h5>English</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="English Score"
              type="number"
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Maths</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="English Score"
              type="number"
            ></IonInput>
          </div>
        </>
      )
    }
    if (testScoreContent === "ACT") {
      return (
        <>
          <h5>ACT Score</h5>
          <div className="mb-1">
            <h5>English</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="English Score"
              type="number"
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Maths</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="English Score"
              type="number"
            ></IonInput>
          </div>
        </>
      )
    }
    if (testScoreContent === "IELTS") {
      return (
        <>
          <div className="mb-1">
            <h5>IELTS Score</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="IELTS Score"
              type="number"
            ></IonInput>
          </div>
        </>
      )
    }
    if (testScoreContent === "TOEFL") {
      return (
        <>
          <div className="mb-1">
            <h5>TOEFL Score</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="TOEFL Score"
              type="number"
            ></IonInput>
          </div>
        </>
      )
    }
  }

  const handleCardPrivacy = () => {
    present({
      duration: 3000,
      message: isCardPrivate ? "Made Public" : "Made Private",
      buttons: [{ text: "X", handler: () => dismiss() }],
      color: "primary",
      mode: "ios"
    })
    setIsCardPrivate(!isCardPrivate)
  }

  if (!myProfile && testScore?.private) {
    return ""
  }

  return (
    <>
      <IonCard className="mb-2">
        <IonCardContent className="card-bb  flex">
          <h1>TestScore</h1>
          {myProfile && (
            <div className="inline-flex">
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={isCardPrivate ? eyeOff : eye}
                onClick={() => {
                  handleCardPrivacy()
                }}
              />
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={add}
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
        </IonCardContent>
        <IonCardContent>
          <IonText color="dark flex">
            <h2>ACT Score:</h2>
            {myProfile && (
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={create}
                onClick={() => setIsOpen(true)}
              />
            )}
          </IonText>
          <IonGrid>
            <IonRow>
              {[
                {
                  title: "Composite",
                  score: scores?.ACT_SCORE?.composite || "N/A"
                },
                {
                  title: "English",
                  score: scores?.ACT_SCORE?.english || "N/A"
                },
                {
                  title: "Math",
                  score: scores?.ACT_SCORE?.maths || "N/A"
                }
              ].map((item, index) => {
                return (
                  <IonCol
                    style={{
                      margin: "5px",
                      padding: "0px"
                    }}
                    key={index}
                    className="ion-padding"
                  >
                    <div
                      style={{
                        width: windowWidth > 720 ? "150px" : "130px",
                        height: windowWidth > 720 ? "150px" : "130px"
                      }}
                      className="rounded-circle"
                    >
                      <div
                        style={{
                          borderRadius: "50%",
                          width: "90%",
                          height: "90%",
                          boxShadow:
                            " rgba(67, 71, 85, 0.67) 0px 0px 0.25em, rgba(90, 125, 188, 0.15) 0px 0.25em 1em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: "5px"
                        }}
                      >
                        <img
                          src={item.image}
                          style={{
                            width: "50px"
                          }}
                          alt=""
                        />
                        <div
                          style={{
                            textAlign: "center"
                          }}
                        >
                          <IonText color="dark">
                            {windowWidth < 720 ? (
                              <h2
                                style={{
                                  margin: 0,
                                  padding: 0
                                }}
                              >
                                {item.score}
                              </h2>
                            ) : (
                              <h1
                                style={{
                                  margin: 0,
                                  padding: 0
                                }}
                              >
                                {item.score}
                              </h1>
                            )}
                          </IonText>

                          <p>{item.title}</p>
                        </div>
                      </div>
                    </div>
                  </IonCol>
                )
              })}
            </IonRow>
          </IonGrid>
        </IonCardContent>
        <IonCardContent>
          <IonText color="dark flex">
            <h2>SAT Score:</h2>
            {myProfile && (
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={create}
                onClick={() => setIsOpen(true)}
              />
            )}
          </IonText>
          <IonGrid>
            <IonRow>
              {[
                {
                  title: "Composite",
                  score: scores?.SAT_SCORE?.composite || "N/A"
                },
                {
                  title: "English",
                  score: scores?.SAT_SCORE?.english || "N/A"
                },
                {
                  title: "Math",
                  score: scores?.SAT_SCORE?.maths || "N/A"
                }
              ].map((item, index) => {
                return (
                  <IonCol
                    style={{
                      margin: "5px",
                      padding: "0px"
                    }}
                    key={index}
                    className="ion-padding"
                  >
                    <div
                      style={{
                        width: windowWidth > 720 ? "150px" : "130px",
                        height: windowWidth > 720 ? "150px" : "130px"
                      }}
                      className="rounded-circle"
                    >
                      <div
                        style={{
                          borderRadius: "50%",
                          width: "90%",
                          height: "90%",
                          boxShadow:
                            " rgba(67, 71, 85, 0.67) 0px 0px 0.25em, rgba(90, 125, 188, 0.15) 0px 0.25em 1em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: "5px"
                        }}
                      >
                        <img
                          src={item.image}
                          style={{
                            width: "50px"
                          }}
                          alt=""
                        />
                        <div
                          style={{
                            textAlign: "center"
                          }}
                        >
                          <IonText color="dark">
                            {windowWidth < 720 ? (
                              <h2
                                style={{
                                  margin: 0,
                                  padding: 0
                                }}
                              >
                                {item.score}
                              </h2>
                            ) : (
                              <h1
                                style={{
                                  margin: 0,
                                  padding: 0
                                }}
                              >
                                {item.score}
                              </h1>
                            )}
                          </IonText>

                          <p>{item.title}</p>
                        </div>
                      </div>
                    </div>
                  </IonCol>
                )
              })}
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      <IonModal isOpen={isOpen} mode="ios">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Score</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false)
                  setTestScoreContent()
                }}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding modal-content">
          <IonItem className="mb-1" mode="md">
            <IonLabel>Type of test</IonLabel>
            <IonSelect
              interface="popover"
              placeholder="Select a test"
              onIonChange={(e) => setTestScoreContent(e.target.value)}
            >
              <IonSelectOption value="SAT">SAT</IonSelectOption>
              <IonSelectOption value="ACT">ACT</IonSelectOption>
              <IonSelectOption value="IELTS">IELTS</IonSelectOption>
              <IonSelectOption value="TOEFL">TOEFL</IonSelectOption>
            </IonSelect>
          </IonItem>
          {handleTestScoreContent()}
          <IonButton mode="ios" expand="block">
            Save Changes
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  )
}
export default TestScore
