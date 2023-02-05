import {
    IonCard,
    IonText,
    IonCardSubtitle,
    IonIcon,
    IonCardContent
} from "@ionic/react"
import { location } from "ionicons/icons"
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
                    <img
                        src={profileImg}
                        className="user-profile__img"
                        alt="userName"
                    />
                </div>
            </div>
            <IonCardContent className="user-card--info">
                <div className="user-card--info-text">
                    <IonText color="dark">
                        <div className="flex justify-content-start">
                            <h1>{name}</h1>
                            <img
                                src="https://www.svgrepo.com/show/178831/badges-money.svg"
                                alt=""
                                width={25}
                            />
                        </div>
                        <IonCardSubtitle>@{username}</IonCardSubtitle>
                    </IonText>

                    {userLocation && (
                        <div className="inline-2 flex-wrap">
                            <IonCardSubtitle className="icon-text">
                                <IonIcon className="icon-16" icon={location} />
                                {userLocation}
                            </IonCardSubtitle>
                        </div>
                    )}
                    {oneLineBio && (
                        <IonText>
                            <p>{oneLineBio}</p>
                        </IonText>
                    )}
                </div>
                {children}
            </IonCardContent>
        </IonCard>
    )
}

export default index
