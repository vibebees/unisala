// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import {
    IonCard,
    IonCardContent,
    IonButton,
    IonModal,
    IonHeader,
    IonButtons,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonAvatar,
    IonLabel
} from "@ionic/react"
import UserCard from "../../../component/userCard"
import "./index.css"

function index() {
    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState(0)

    const tabMenu = [
        { id: 0, menu: "Received" },
        { id: 1, menu: "Sent" }
    ]

    const requestContent = () => {
        if (tab === 0) {
            return (
                <IonItem mode="ios" className="mb-1" key={index} lines="full">
                    <IonAvatar slot="start">
                        <img
                            src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
                            alt=""
                        />
                    </IonAvatar>
                    <IonLabel>
                        <div className="flex">
                            <div>
                                <h2>John Doe</h2>
                                <p>@johndoe</p>
                            </div>
                            <div className="inline-1">
                                <IonButton
                                    mode="ios"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Accept
                                </IonButton>
                                <IonButton
                                    mode="ios"
                                    onClick={() => setIsOpen(false)}
                                    color="dark"
                                    fill="outline"
                                >
                                    Decline
                                </IonButton>
                            </div>
                        </div>
                    </IonLabel>
                </IonItem>
            )
        }
        return (
            <IonItem mode="ios" className="mb-1" key={index} lines="full">
                <IonAvatar slot="start">
                    <img
                        src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
                        alt=""
                    />
                </IonAvatar>
                <IonLabel>
                    <div className="flex">
                        <div>
                            <h2>John Doe</h2>
                            <p>@johndoe</p>
                        </div>
                        <IonButton
                            mode="ios"
                            onClick={() => setIsOpen(false)}
                            color="dark"
                            fill="outline"
                        >
                            Cancel Request
                        </IonButton>
                    </div>
                </IonLabel>
            </IonItem>
        )
    }

    return (
        <IonCard className="mb-2">
            <IonCardContent>
                <div className="pending-title-wrapper">
                    <h2>No pending requests</h2>
                    <h2 onClick={() => setIsOpen(true)}>Manage</h2>
                </div>
                <div className="grid-3">
                    <UserCard
                        profileBanner="https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        profileImg="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
                        name="John Doe"
                        username="johndoe"
                        loaction="Nepal"
                        oneLineBio="this is a one liner"
                    >
                        <IonButton
                            color="primary"
                            mode="ios"
                            className="outline-button"
                            expand="block"
                        >
                            Accept
                        </IonButton>
                        <IonButton
                            color="dark"
                            mode="ios"
                            className="outline-button"
                            expand="block"
                            fill="outline"
                        >
                            Decline
                        </IonButton>
                    </UserCard>
                </div>
            </IonCardContent>

            <IonModal isOpen={isOpen} mode="ios">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Connection Requests</IonTitle>
                        <IonButtons slot="end">
                            <IonButton
                                onClick={() => {
                                    setIsOpen(false)
                                }}
                            >
                                Close
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding modal-content">
                    <div className="requests-header">
                        {tabMenu.map((tabItem, i) => {
                            const { id, menu } = tabItem
                            return (
                                <h5
                                    key={id}
                                    className={
                                        id === tab
                                            ? "requests-header--active-tab"
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
                    <div className="requests-content">{requestContent()}</div>
                </IonContent>
            </IonModal>
        </IonCard>
    )
}

export default index
