import React from "react"
import AddToList from "../atoms/AddToList"
import CopyLink from "../atoms/CopyLink"
import SocialMediaShare from "../atoms/SocialMediaShare"
import { logoFacebook, logoTwitter, logoInstagram } from "ionicons/icons"

const ListOptions = ({ allProps }) => {
  const { link } = allProps

  return (
    <div>
      <AddToList />
      <CopyLink link={link} />
      <SocialMediaShare
        Icon={logoFacebook}
        title={"Facebook"}
        type={"facebook"}
        redirectURL={link}
      />
      <SocialMediaShare
        Icon={logoTwitter}
        type={"twitter"}
        redirectURL={link}
        title={"Twitter"}
      />
    </div>
  )
}

export default ListOptions
