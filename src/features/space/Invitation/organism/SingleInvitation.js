import React from "react"
import { IonCard, IonInput } from "@ionic/react"
import SendButton from "../atoms/SendButton"
import Header from "../atoms/Header"
import InvitationTypesCheckbox from "../organism/InvitationTypesCheckbox"

const SingleInvitation = () => {
  const [email, setEmail] = React.useState("")
  const [invitationType, setInvitationType] = React.useState("")

  return (
    <div>
      <IonCard className="ion-no-margin ion-no-padding shadow-none px-4 py-6">
        <Header
          header={"Send Invitation"}
          subHeader={
            "Enter the email address of the person you want to invite."
          }
        />
        <br />
        <IonInput
          type="email"
          className="border-2 border-neutral-300 rounded-lg p-2 focus-within:border-neutral-700 duration-300"
          placeholder="Enter email address"
          value={email}
          onIonChange={(e) => setEmail(e.target.value)}
        />
        <InvitationTypesCheckbox
          allProps={{
            invitationType,
            setInvitationType,
            admin: false
          }}
        />
        <SendButton label="Send Invitation" />
      </IonCard>
    </div>
  )
}

export default SingleInvitation
