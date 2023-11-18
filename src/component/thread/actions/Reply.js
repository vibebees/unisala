import { IonIcon, IonButtons, IonText } from "@ionic/react"
import { chatbubble } from "ionicons/icons"

function Reply({ repliesCount, setReply }) {
  return (
    <IonButtons
      className="post-button cursor-pointer"
      onClick={() => setReply((state) => !state)}
    >
      <IonIcon
        color="medium"
        style={{
          margin: "0px",
          fontSize: "23px"
        }}
        icon={chatbubble}
      />
      <IonText style={{ marginLeft: "5px" }}>
        <p
          style={{
            margin: "0px",
            padding: "0px"
          }}
        >
          {repliesCount}
        </p>
      </IonText>
    </IonButtons>
  )
}

export default Reply
