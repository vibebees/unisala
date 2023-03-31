import { IonIcon, IonItem, IonAvatar, IonLabel, IonButtons } from "@ionic/react"
import { logOut } from "ionicons/icons"
import "./index.css"
import { Link } from "react-router-dom"
import jwtDecode from "jwt-decode"
import Authentication from "../authentication"
import { useEffect } from "react"

export const ProfilePop = ({
  setPopoverOpen,
  setActiveNavDrop,
  activeNavDrop
}) => {
  const accessToken = localStorage?.getItem("accessToken")
  const decode = accessToken && jwtDecode(accessToken)

  useEffect(() => {
    if (!decode) {
      setActiveNavDrop({
        profile: !activeNavDrop.profile
      })
    }
  }, [decode])

  if (!decode) {
    return (
      <Authentication
        activeNavDrop={activeNavDrop}
        setActiveNavDrop={setActiveNavDrop}
      />
    )
  }

  return (
    <>
      <Link to={`/@/${decode?.username}`}>
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
            <img
              src={
                "https://vz.cnwimg.com/thumb-1200x/wp-content/uploads/2010/10/Chris-Evans-e1587513440370.jpg"
              }
            />
          </IonAvatar>
          <IonLabel>
            <h2
              style={{
                margin: 0
              }}
            >
              {decode.username}
            </h2>
          </IonLabel>
        </IonItem>
      </Link>
      <div className="profile-drop-div">
        <IonButtons
          onClick={() => {
            setPopoverOpen(false)
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
