// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonIcon,
    IonCard,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButtons
} from "@ionic/react"
import { document, home, settings } from "ionicons/icons"
import "./index.css"
import { Link } from "react-router-dom"
import jwtDecode from "jwt-decode"
export const ProfilePop = () => {
    const decode = jwtDecode(localStorage.getItem("accessToken"))
    return (
        <IonCard className="profile-drop">
            <Link exact to={`/user/${decode?.username}`}>
                <IonItem
                    style={{
                        borderBottom: "1px solid #e0e0e0"
                    }}
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
                            Nabin Kharel
                        </h2>
                        <p
                            style={{
                                margin: 0
                            }}
                        >
                            Bharatpur-12, chitwan
                        </p>
                    </IonLabel>
                </IonItem>
            </Link>
            <div className="profile-drop-div">
                <IonButtons className="profile-drop-btn" lines="none">
                    <IonIcon slot="start" icon={document} />
                    <IonLabel color="dark">Drafts</IonLabel>
                </IonButtons>
                <IonButtons className="profile-drop-btn" lines="none">
                    <IonIcon slot="start" icon={settings} />
                    <IonLabel color="dark">Settings</IonLabel>
                </IonButtons>
                <IonButtons
                    onClick={() => {
                        localStorage.clear()
                        window.location.reload()
                    }}
                    className="profile-drop-btn"
                    lines="none"
                >
                    <IonIcon slot="start" icon={home} />
                    <IonLabel color="dark">Log out</IonLabel>
                </IonButtons>
            </div>
        </IonCard>
    )
}
export default ProfilePop
