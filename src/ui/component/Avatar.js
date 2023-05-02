import { useEffect, useMemo, useState } from "react"
import { createAvatar } from "@dicebear/core"
import { thumbs } from "@dicebear/collection"
import { getImage } from "../../servers/s3.configs"

export function Avatar({ profilePic, username }) {

  const avatar = useMemo(() => {
    // eslint-disable-next-line no-sync
    return username && createAvatar(thumbs, {
      size: 128,
      seed: username
      // ... other options
    })?.toDataUriSync()
  }, [profilePic, username])

  console.log({ profilePic })
  return (
    <img
      src={profilePic || avatar}
      className="user-profile__img"
      alt="userName"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  )
}
