import { IonCard } from "@ionic/react"
import React from "react"
import { SpaceRole } from "utils/lib/SpaceRoles"
import { OrgContext } from ".."
import SendInvitationAll from "./organism/SendInvitationAll"
import SingleInvitation from "./organism/SingleInvitation"

const Index = () => {
  const test = React.useContext(OrgContext)
  const { role, orgId } = React.useContext(OrgContext)
  console.log({ orgId })
  return (
    <IonCard className="h-fit shadow-none mt-1 ion-no-margin w-full">
      {role === SpaceRole.ADMIN && <SendInvitationAll />}
      <SingleInvitation role={role} orgId={orgId} />
    </IonCard>
  )
}

export default Index

