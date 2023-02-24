// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import {
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent
} from "@ionic/react"
import useWindowWidth from "../../../hooks/useWindowWidth"
import TopUniversitySidebar from "../../component/TopUniversitySidebar"
import "./index.css"

const ProfilePage = () => {
    let windowWidth = useWindowWidth()
    const [tab, setTab] = useState(0)

    const tabMenu = [
        { id: 0, menu: "All Notifications" },
        { id: 1, menu: "Threads" },
        { id: 2, menu: "Reactions" },
        { id: 3, menu: "Mentions" }
    ]

    return (
        <IonContent>
            <IonGrid className="max-width-container">
                <IonRow>
                    <IonCol>
                        <IonCard className="mb-1">
                            <IonCardContent>
                                <div className="flex card-bb pb-1">
                                    <h2>Notifications</h2>
                                    <p>Mark all as Read</p>
                                </div>

                                <div className="notificatons-tabs inline-2">
                                    {tabMenu.map((tabItem) => {
                                        const { id, menu } = tabItem
                                        return (
                                            <h5
                                                key={id}
                                                className={
                                                    id === tab
                                                        ? "notificatons-tabs--menu"
                                                        : ""
                                                }
                                                onClick={() => {
                                                    setTab(id)
                                                }}
                                            >
                                                {menu}
                                            </h5>
                                        )
                                    })}
                                </div>
                            </IonCardContent>
                        </IonCard>

                        <IonCard>
                            <IonCardContent>
                                <div className="notificatons-tabs-content">
                                    Hi 👋, Chaman Bravo. <br /> <br />
                                    Welcome to Unisala -- The perfect place
                                    truly helps in finding the perfect
                                    university for you.
                                    <br />
                                    <br /> Here is some information to help you
                                    get started with Unisala.
                                    <br />
                                    <br /> How does it work?
                                    <br /> lorem ipsum....
                                    <br />
                                    <br />
                                    Quick
                                    <br /> ✍️ Ask your queries
                                    <br /> 📃 Read stories from your
                                    personalized feed
                                    <br /> 😎 Keep your profile up-to-date
                                    <br /> 🚔 Code of Conduct
                                    <br />
                                    <br /> We share the best articles on Twitter
                                    and LinkedIn. Follow us to stay updated
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    {windowWidth >= 1080 && (
                        <IonCol className="sidebar">
                            <TopUniversitySidebar />
                        </IonCol>
                    )}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default ProfilePage
