import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import { thumbs } from "@dicebear/collection"

function Avatar({ profilePic, username }) {
  const avatar = useMemo(() => {
    // eslint-disable-next-line no-sync
    return createAvatar(thumbs, {
      size: 128,
      seed: username
      // ... other options
    }).toDataUriSync()
  }, [profilePic, username])

  return (
    <img
      src={profilePic || avatar}
      className="user-profile__img"
      alt={username}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  )
}

export default Avatar
