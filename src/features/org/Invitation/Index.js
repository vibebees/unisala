import React from "react"
import {SpaceRole} from "utils/lib/SpaceRoles"
import {OrgContext} from ".."
import Card from "../../../component/ui/Card"
import SendInvitationAll from "./organism/SendInvitationAll"
import SingleInvitation from "./organism/SingleInvitation"
const Index = () => {
  const { orgId, orgData } = React.useContext(OrgContext)
  return (
    <Card className="h-fit shadow-none mt-1 ion-no-margin w-full">
      {(orgData?.role === SpaceRole.ADMIN ||
        orgData?.role === SpaceRole.MEMBER) && <SendInvitationAll />}
      <SingleInvitation
        isJoined={orgData.isJoined}
        role={orgData?.role}
        orgId={orgId}
      />
    </Card>
  )
}

export default Index
