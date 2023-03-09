import {
  IonCard,
  IonText,
  IonCardSubtitle,
  IonIcon,
  IonCardContent
} from "@ionic/react"
import { location } from "ionicons/icons"
import { Link } from "react-router-dom"
import "./index.css"

function index({
  profileBanner,
  profileImg,
  name,
  username,
  loaction: userLocation,
  oneLineBio,
  children
}) {
  return (
    <IonCard className="user-card">
      <div className="user-card--user-banner">
        <div className="user-card--cover">
          <img src={profileBanner} alt="userName banner" />
        </div>

        <div className="user-card--profile">
          <img src={profileImg} className="user-profile__img" alt="userName" />
        </div>
      </div>
      <IonCardContent className="user-card--info">
        <Link to={`/${username}`} className="user-card--info-link">
          <div className="user-card--info-text">
            <IonText color="dark">
              <h1 style={{ fontSize: "1.2rem" }}>{name}</h1>
              <IonCardSubtitle className="inline-2 flex-wrap">
                @{username}
                {userLocation && (
                  <IonCardSubtitle className="icon-text">
                    <IonIcon className="icon-16" icon={location} />
                    {userLocation.length > 10
                      ? userLocation.slice(0, 10) + "..."
                      : userLocation}
                  </IonCardSubtitle>
                )}
              </IonCardSubtitle>
            </IonText>

            {oneLineBio && (
              <IonCardSubtitle>
                <p>{oneLineBio}</p>
              </IonCardSubtitle>
            )}
          </div>
        </Link>
        {children}
      </IonCardContent>
    </IonCard>
  )
}

export default index
