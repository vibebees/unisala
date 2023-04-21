import { IonIcon, IonItem, IonAvatar, IonLabel, IonButtons } from "@ionic/react"
import { logOut } from "ionicons/icons"
import "./index.css"
import { Link } from "react-router-dom"
import Authentication from "../authentication"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Avatar from "../Avatar"
import { imageAccess } from "../../../servers/endpoints"

export const ProfilePop = ({
  setPopoverOpen,
  setActiveNavDrop,
  activeNavDrop
}) => {
  const { user, loggedIn } = useSelector((state) => state.userProfile)
  const profilePic = user?.picture ? imageAccess + user?.picture : null

  useEffect(() => {
    if (!loggedIn) {
      setActiveNavDrop({
        profile: !activeNavDrop.profile
      })
    }
  }, [loggedIn])

  if (!loggedIn) {
    return (
      <Authentication
        activeNavDrop={activeNavDrop}
        setActiveNavDrop={setActiveNavDrop}
      />
    )
  }

  return (
    <>
      <Link to={`/@/${user?.username}`}>
        <IonItem
          button
          detail={false}
          style={{
            borderBottom: "1px solid #e0e0e0"
          }}
          onClick={() => setPopoverOpen(false)}
          lines="none"
        >
          <IonAvatar slot="start">
            <Avatar username={user.username} profilePic={profilePic} />
          </IonAvatar>
          <IonLabel>
            <h2
              style={{
                margin: 0
              }}
            >
              {user.username}
            </h2>
          </IonLabel>
        </IonItem>
      </Link>
      <div className="profile-drop-div">
        <IonButtons
          onClick={() => {
            setPopoverOpen(false)
            setActiveNavDrop({
              profile: false
            })
            localStorage.clear()
            window.location.reload()
          }}
          className="profile-drop-btn"
          lines="none"
        >
          <IonIcon slot="start" icon={logOut} />
          <IonLabel color="dark">Log out</IonLabel>
        </IonButtons>
      </div>
    </>
  )
}
export default ProfilePop
