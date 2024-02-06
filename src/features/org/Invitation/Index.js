import React from "react"
import SendInvitationAll from "./organism/SendInvitationAll"
import { IonCard } from "@ionic/react"
import SingleInvitation from "./organism/SingleInvitation"
import { OrgContext } from ".."
import { SpaceRole } from "utils/lib/SpaceRoles"

const Index = () => {
  const { role, spaceId } = React.useContext(OrgContext)
  return (
    <IonCard className="h-fit shadow-none mt-1 ion-no-margin w-full">
      {role === SpaceRole.ADMIN && <SendInvitationAll />}
      <SingleInvitation spaceId={spaceId} />
    </IonCard>
  )
}

export default Index
