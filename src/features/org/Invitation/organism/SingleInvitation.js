import { IonCard, IonInput, useIonToast } from "@ionic/react"
import { authInstance } from "api/axiosInstance"
import React from "react"
import { userServer } from "servers/endpoints"
import { SpaceRole } from "utils/lib/SpaceRoles"
import Header from "../atoms/Header"
import SendButton from "../atoms/SendButton"
import InvitationTypesCheckbox from "./InvitationTypesCheckbox"
import NotJoinedWrapper from "features/org/NotJoinedWrapper"

const SingleInvitation = ({ orgId, role, isJoined }) => {
  const [email, setEmail] = React.useState("")
  const [invitationType, setInvitationType] = React.useState("")
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = React.useState(false)

  const handleSendInvitation = () => {
    if (!email || !orgId) {
      return present({
        duration: 3000,
        message: "Please enter email address",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
    setLoading(true)
    authInstance
      .post(`${userServer}/org-invitation-request/${orgId}`, {
        emails: [email],
        description: "invitation for space",
        role: invitationType.toLowerCase()
      })
      .then((res) => {
        if (res.data.success) {
          present({
            duration: 3000,
            message: "Invitation sent successfully",
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
        }
        setEmail("")
      })
      .catch((err) => {
        present({
          duration: 3000,
          message: err?.response?.data?.message || " Something went wrong",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <IonCard className="ion-no-margin ion-no-padding shadow-none px-4 py-6">
        <Header
          header={"Send Invitation by Email"}
          subHeader={
            "Enter the email address of the person you want to invite."
          }
        />
        <br />
        <IonInput
          type="email"
          autocomplete="additional-name"
          className="border-2 border-neutral-300 rounded-lg p-2 focus-within:border-neutral-700 duration-300"
          placeholder="Enter email address"
          value={email}
          onIonChange={(e) => setEmail(e.target.value)}
        />
        <InvitationTypesCheckbox
          allProps={{
            invitationType,
            setInvitationType,
            admin: role === SpaceRole.ADMIN || role === SpaceRole.MEMBER
          }}
        />
        <NotJoinedWrapper
          isJoined={isJoined}
          message="Please Join the Organization to send Invitation to others"
        >
          <SendButton
            loading={loading}
            onclick={handleSendInvitation}
            label="Send Invitation"
          />
        </NotJoinedWrapper>
      </IonCard>
    </div>
  )
}

export default SingleInvitation
