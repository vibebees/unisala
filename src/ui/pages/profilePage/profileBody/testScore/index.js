import { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonIcon,
  useIonToast,
  IonChip,
  IonButton
} from "@ionic/react"
import { eyeOff, eye, add } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { ToggleView } from "../../../../../graphql/user/"
import EditTestScore from "./editTestScore"

const TestScore = ({ testScore, myProfile }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scores, setScores] = useState(testScore?.scores)
  const [isCardPrivate, setIsCardPrivate] = useState(testScore?.private)
  const [present, dismiss] = useIonToast()

  const [toggleView] = useMutation(ToggleView, {
    variables: { card: "testScore" },
    onCompleted: (data) => {
      if (data.toggleView.status.success) {
        present({
          duration: 3000,
          message: data.toggleView.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsCardPrivate(!isCardPrivate)
      }
    }
  })

  // eslint-disable-next-line complexity
  const ComponentToRender = () => {
    if (
      myProfile &&
      !(
        scores?.ACT_SCORE?.maths ||
        scores?.SAT_SCORE?.maths ||
        scores?.IELTS_SCORE?.score ||
        scores?.TOEFL_SCORE?.score
      )
    ) {
      return (
        <IonCardContent className="center-text">
          <p>Share your education</p>
          <IonButton
            color="primary"
            mode="ios"
            className="icon-text"
            onClick={() => setIsOpen(true)}
          >
            Add Scores
          </IonButton>
        </IonCardContent>
      )
    }

    if (
      myProfile ||
      (!myProfile && scores?.ACT_SCORE?.maths) ||
      scores?.SAT_SCORE?.maths ||
      scores?.IELTS_SCORE?.score ||
      scores?.TOEFL_SCORE?.score
    ) {
      return (
        <IonCardContent>
          <IonGrid>
            <IonRow>
              {(scores.IELTS_SCORE.score || scores.TOEFL_SCORE.score) && (
                <IonCol
                  style={{
                    borderRight:
                      (scores.ACT_SCORE.maths || scores.SAT_SCORE.maths) &&
                      "solid 2px #ddd"
                  }}
                >
                  <IonText color="dark" style={{ textAlign: "center" }}>
                    <h2>English Test</h2>
                  </IonText>
                  <IonRow>
                    {scores.IELTS_SCORE.score && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="primary">
                          <h2
                            style={{
                              background: "#EFF5FF",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.IELTS_SCORE.score}
                          </h2>
                        </IonText>
                        <IonChip color="primary" style={{ fontWeight: "bold" }}>
                          IELTS
                        </IonChip>
                      </IonCol>
                    )}
                    {scores.TOEFL_SCORE.score && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="secondary">
                          <h2
                            style={{
                              background: "#F0FAFF",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.TOEFL_SCORE.score}
                          </h2>
                        </IonText>
                        <IonChip
                          color="secondary"
                          style={{ fontWeight: "bold" }}
                        >
                          TOEFL
                        </IonChip>
                      </IonCol>
                    )}
                  </IonRow>
                </IonCol>
              )}
              {(scores.ACT_SCORE.maths || scores.SAT_SCORE.maths) && (
                <IonCol>
                  <IonText color="dark" style={{ textAlign: "center" }}>
                    <h2>Aptitude Test</h2>
                  </IonText>
                  <IonRow>
                    {scores.ACT_SCORE.maths && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="tertiary">
                          <h2
                            style={{
                              background: "#F1F3FF",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.ACT_SCORE.maths + scores.ACT_SCORE.english}
                          </h2>
                        </IonText>
                        <IonChip
                          color="tertiary"
                          style={{ fontWeight: "bold" }}
                        >
                          ACT
                        </IonChip>
                      </IonCol>
                    )}
                    {scores.SAT_SCORE.maths && (
                      <IonCol
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "fit-content"
                        }}
                      >
                        <IonText color="success">
                          <h2
                            style={{
                              background: "#EFFCF4",
                              width: "5rem",
                              height: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              fontSize: "1.5rem",
                              fontWeight: "bold"
                            }}
                          >
                            {scores.SAT_SCORE.maths + scores.SAT_SCORE.english}
                          </h2>
                        </IonText>
                        <IonChip color="success" style={{ fontWeight: "bold" }}>
                          SAT
                        </IonChip>
                      </IonCol>
                    )}
                  </IonRow>
                </IonCol>
              )}
            </IonRow>
          </IonGrid>
        </IonCardContent>
      )
    }
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
                  toggleView()
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
        <ComponentToRender />
      </IonCard>

      <EditTestScore
        scores={scores}
        setScores={setScores}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default TestScore
