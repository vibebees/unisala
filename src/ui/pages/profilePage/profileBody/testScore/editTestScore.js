import { useState } from "react"
import {
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
  IonLabel,
  useIonToast,
  IonSpinner
} from "@ionic/react"
import { useMutation } from "@apollo/client"
import { AddTestScore } from "../../../../../graphql/user/"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

function EditTestScore({ scores, setScores, setIsOpen, isOpen }) {
  const [input, setInput] = useState(scores)
  const [present, dismiss] = useIonToast()
  const [testScoreContent, setTestScoreContent] = useState("SAT")

  const handleChange = (e) => {
    if (e.target.name.split("_")[0] === "SAT") {
      setInput({
        ...input,
        SAT_SCORE: {
          ...input.SAT_SCORE,
          [e.target.name.split("_").at(-1)]: Number(e.target.value)
        }
      })
    }
    if (e.target.name.split("_")[0] === "ACT") {
      setInput({
        ...input,
        ACT_SCORE: {
          ...input.ACT_SCORE,
          [e.target.name.split("_").at(-1)]: Number(e.target.value)
        }
      })
    }
    if (e.target.name.split("_")[0] === "IELTS") {
      setInput({
        ...input,
        IELTS_SCORE: {
          ...input.IELTS_SCORE,
          [e.target.name.split("_").at(-1)]: Number(e.target.value)
        }
      })
    }
    if (e.target.name.split("_")[0] === "TOEFL") {
      setInput({
        ...input,
        TOEFL_SCORE: {
          ...input.TOEFL_SCORE,
          [e.target.name.split("_").at(-1)]: Number(e.target.value)
        }
      })
    }
  }

  const [addTestScore, { loading }] = useMutation(AddTestScore("testScores"), {
    context: { server: USER_SERVICE_GQL },
    variables: {
      testScores: {
        SAT_SCORE: {
          maths: input.SAT_SCORE.maths || null,
          english: input.SAT_SCORE.english || null
        },
        ACT_SCORE: {
          maths: input.ACT_SCORE.maths || null,
          english: input.ACT_SCORE.english || null
        },
        IELTS_SCORE: { score: input.IELTS_SCORE.score || null },
        TOEFL_SCORE: { score: input.TOEFL_SCORE.score || null }
      }
    },
    onCompleted: (data) => {
      if (data.addTestScore.status.success) {
        setScores(data.addTestScore.testScore.scores)
        present({
          duration: 3000,
          message: "About Updated",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
      }
    }
  })

  const submitTest = () => {
    addTestScore()
  }

  const handleTestScoreContent = () => {
    if (testScoreContent === "SAT") {
      return (
        <>
          <h5 className="mb-1">SAT Score</h5>
          <div className="mb-1">
            <h5>English</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="English Score"
              type="number"
              name="SAT_SCORE_english"
              value={input.SAT_SCORE.english}
              onIonChange={handleChange}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Maths</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="Maths Score"
              type="number"
              name="SAT_SCORE_maths"
              value={input.SAT_SCORE.maths}
              onIonChange={handleChange}
            ></IonInput>
          </div>
        </>
      )
    }
    if (testScoreContent === "ACT") {
      return (
        <>
          <h5 className="mb-1">ACT Score</h5>
          <div className="mb-1">
            <h5>English</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="English Score"
              type="number"
              name="ACT_SCORE_english"
              value={input.ACT_SCORE.english}
              onIonChange={handleChange}
            ></IonInput>
          </div>
          <div className="mb-1">
            <h5>Maths</h5>
            <IonInput
              mode="md"
              className="input-box"
              placeholder="Maths Score"
              name="ACT_SCORE_maths"
              value={input.ACT_SCORE.maths}
              onIonChange={handleChange}
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
              name="IELTS_SCORE_score"
              value={input.IELTS_SCORE.score}
              onIonChange={handleChange}
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
              name="TOEFL_SCORE_score"
              value={input.TOEFL_SCORE.score}
              onIonChange={handleChange}
            ></IonInput>
          </div>
        </>
      )
    }
  }
  return (
    <IonModal isOpen={isOpen} mode="ios">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Score</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(false)
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
        <IonButton mode="ios" expand="block" onClick={submitTest}>
          {loading ? <IonSpinner /> : "Save Changes"}
        </IonButton>
      </IonContent>
    </IonModal>
  )
}

export default EditTestScore
