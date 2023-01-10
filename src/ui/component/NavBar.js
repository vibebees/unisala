// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import {
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonCard
} from "@ionic/react"
import {
    chatbubbles,
    home,
    notifications,
    people,
    personCircle
} from "ionicons/icons"
import { Link } from "react-router-dom"
import SearchBox from "./searchBox"
import NotificationItem from "./notificationItem"
import ProfilePop from "./profilePop"
// eslint-disable-next-line
import jwt_decode from "jwt-decode"

const Nav = ({ setActiveNavDrop, activeNavDrop }) => {
    const accessToken = localStorage?.getItem("accessToken")

    const navigation = [
        {
            name: "Home",
            icon: home,
            link: "/home"
        },
        {
            name: "My Network",
            icon: people,
            link: "/mynetwork"
        },
        {
            name: "Message",
            icon: chatbubbles,
            link: "/messages"
        }
        // {
        //     name: "Notification",
        //     icon: notifications,
        //     link: "/notifications"
        // }
        // {
        //     name: "My profile",
        //     icon: personCircle,
        //     link: "/home"
        // }
    ]
    const [active, setActive] = React.useState(0)
    const notification = React.useRef(null)
    const chatList = [
        {
            id: "1",
            message:
                "Why drag something out when you could get it done in one fell swoop?",
            name: "Sara Hall",
            date: "jan 24",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        },
        {
            id: "2",
            message: "These are just the first of many shortcuts",
            name: "Ali Khan",
            date: "jan 21",
            image: "https://filmfare.wwmindia.com/thumb/content/2019/aug/hrithikroshanweb1565958352.jpg?width=1200&height=900"
        },
        {
            id: "3",
            message:
                "Lorem ipsum dolor sit amet consec tetur adipisicing elit tetur adipisicing elit.",
            name: "Ram Kumar",
            date: "jan 19",
            image: "https://i.pinimg.com/originals/1d/df/a9/1ddfa98a7e262b691614bc30923a40d5.jpg"
        },
        {
            id: "4",
            message: "Supercharge your Messenger experience",
            name: "Hari Paudel",
            date: "jan 15",
            image: "https://qph.cf2.quoracdn.net/main-qimg-8e8ea0637a05240ab9c8409ff1860ac9-lq"
        }
    ]
    const [profileDrop, setProfileDrop] = useState(false)
    const decode = accessToken && jwt_decode(accessToken)
    return (
        <IonGrid
            style={{
                boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                padding: "0px",
                backgroundColor: "white",
                position: "sticky",
                top: 0,
                zIndex: 10,
                width: "100%"
            }}
        >
            <IonRow style={{ maxWidth: "1280px", marginInline: "auto" }}>
                <IonCol
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "30px"
                    }}
                >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
                        alt="logo"
                        style={{
                            width: "45px"
                        }}
                    />
                    <div
                        style={{
                            width: "100%"
                        }}
                    >
                        <SearchBox />
                    </div>
                </IonCol>
                <IonCol>
                    <IonRow>
                        {navigation.map((item, index) => {
                            return (
                                <IonCol
                                    key={index}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    <Link
                                        to={item?.link}
                                        onClick={() => setActive(index)}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                gap: "3px"
                                            }}
                                        >
                                            <IonIcon
                                                style={{
                                                    fontSize: "25px"
                                                }}
                                                color={
                                                    active === index
                                                        ? "dark"
                                                        : "medium"
                                                }
                                                icon={item.icon}
                                            />

                                            <IonText
                                                color={
                                                    active === index
                                                        ? "dark"
                                                        : "medium"
                                                }
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "14px"
                                                    }}
                                                >
                                                    {item.name}
                                                </p>
                                            </IonText>
                                        </div>
                                    </Link>
                                </IonCol>
                            )
                        })}
                        <IonCol
                            className="profile-pop"
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            {" "}
                            <div
                                tabIndex="129"
                                onFocus={() => {
                                    // setActiveNavDrop({
                                    //     notifications:
                                    //         !activeNavDrop.notifications
                                    // })
                                    notification.current?.focus()
                                }}
                                // onBlurCapture={() => {
                                //     setActiveNavDrop({
                                //         notifications: false
                                //     })
                                // }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: "3px"
                                }}
                            >
                                <IonIcon
                                    style={{
                                        fontSize: "25px"
                                    }}
                                    color={
                                        activeNavDrop.notifications
                                            ? "dark"
                                            : "medium"
                                    }
                                    icon={notifications}
                                />

                                <IonText
                                    color={
                                        activeNavDrop.notifications
                                            ? "dark"
                                            : "medium"
                                    }
                                >
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "14px"
                                        }}
                                    >
                                        Notification
                                    </p>
                                </IonText>
                            </div>
                            {/* {activeNavDrop && <ProfilePop />} */}
                            <div
                                style={{
                                    height: activeNavDrop.notifications
                                        ? notification.current?.scrollHeight +
                                          "px"
                                        : "0px"
                                }}
                                tabIndex="2"
                                ref={notification}
                                onFocus={() => {
                                    setActiveNavDrop({
                                        notifications: true
                                    })
                                }}
                                onBlur={() => {
                                    setActiveNavDrop({
                                        notifications: false
                                    })
                                }}
                                className="notification-drop"
                            >
                                <Link
                                    style={{
                                        position: "relative",
                                        zIndex: 10000
                                    }}
                                    to={`/Notifications`}
                                >
                                    <IonCard>
                                        <IonText
                                            color="dark"
                                            className="post-title"
                                        >
                                            <h3>Notifications</h3>
                                        </IonText>
                                        {/* <IonText
                                        className="ion-margin-left"
                                        color="dark"
                                    >
                                        <h3>Notifications</h3>
                                    </IonText> */}
                                        {chatList.map((item, index) => {
                                            return (
                                                <NotificationItem
                                                    key={index}
                                                    {...item}
                                                />
                                            )
                                        })}
                                    </IonCard>
                                </Link>
                            </div>
                        </IonCol>
                        <IonCol
                            className="profile-pop"
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            {" "}
                            <div
                                onClick={() => {
                                    decode
                                        ? setProfileDrop(!profileDrop)
                                        : setActiveNavDrop({
                                              profile: !activeNavDrop.profile
                                          })
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: "3px"
                                }}
                            >
                                <IonIcon
                                    style={{
                                        fontSize: "25px"
                                    }}
                                    color={
                                        activeNavDrop.profile
                                            ? "dark"
                                            : "medium"
                                    }
                                    icon={personCircle}
                                />

                                <IonText
                                    color={
                                        activeNavDrop.profile
                                            ? "dark"
                                            : "medium"
                                    }
                                >
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "14px"
                                        }}
                                    >
                                        My profile
                                    </p>
                                </IonText>
                            </div>
                            {profileDrop && <ProfilePop />}
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Nav
