import { useState, useEffect } from "react"
import {
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonCard,
    IonPage
} from "@ionic/react"
import "./Home.css"
import { personCircle } from "ionicons/icons"
import Post from "../../component/post/index"
import { useQuery } from "@apollo/client"
import VerifyPostPop from "../../component/verifyPostPop/verifyPostPop"
import jwtDecode from "jwt-decode"
import GetProfileCard from "../../../graphql/user/GetProfileCard"
import unisalaImg from "../../../assets/unisala-intro.png"
import HomeFeed from "./HomeFeed"
import UnisalaIntro from "./UnisalaIntro"
import useDocTitle from "../../../hooks/useDocTitile"

export const Home = ({ setPopup }) => {
    const
        accessToken = localStorage?.getItem("accessToken"),
        decode = accessToken && jwtDecode(accessToken),
        profileData = useQuery(GetProfileCard, {
            variables: {
                username: decode?.username
            }
        }),
        [width, setWidth] = useState(window.innerWidth),
        handleResize = () => {
            const { innerWidth } = window
            if (width !== innerWidth) {
                setWidth(innerWidth)
            }
        },
        [activeProfile, setActiveProfile] = useState(false),
        [activeTab, setActiveTab] = useState(0),
        views = {
            greaterThan1000: screenGreaterThan1000(),
            greaterThan768: screensMoreThan768({ activeTab, setActiveTab, unisalaImg, profileData, decode }),
            lessThan768: screenLessThan768({ setActiveProfile, personCircle, activeProfile })
        }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    return (
        <IonPage>
            <IonContent
                color="light">
                <VerifyPostPop />
                {width < 768 && (
                    <IonHeader
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 999,
                            backgroundColor: "white",
                            padding: "8px",
                            borderBottom: "1px solid #e0e0e0"
                        }}
                        className="ion-no-border"
                    >
                        <div
                            style={{
                                display: "flex",
                                alignSelf: "center",
                                height: "100%",
                                width: "95%",
                                margin: "auto",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <SearchInput />
                            <div
                                onClick={() => {
                                    setActiveProfile(true)
                                }}
                                className="profile-pop"
                            >
                                <IonIcon size="large" icon={personCircle} />
                                {/* {activeProfile && <ProfilePop />} */}
                                {activeProfile && (
                                    <Authentication
                                        setActiveProfile={setActiveProfile}
                                        activeProfile={activeProfile}
                                    />
                                )}
                            </div>
                        </div>
                    </IonHeader>
                )}
                <IonGrid
                    style={{
                        width: width >= 768 ? "95%" : "100%",
                        margin: "auto",
                        padding: "0px",
                        maxWidth: "1800px"
                    }}>
                    <IonRow
                        style={{
                            justifyContent: "flex-start",
                            margin: "0 auto"
                        }}
                        className="max-width-container">
                        {width > 768 && views.greaterThan768}
                        <IonCol
                            style={{
                                maxWidth: "700px",
                                margin: "auto",
                                minHeight: "calc(90vh)"
                            }}>
                            {decode && width >= 768 && (
                                <IonCard style={{ margin: "20px 0px" }} onClick={() => {
                                    setPopup(true)
                                }} >
                                    <Post />
                                </IonCard>
                            )}
                            {
                                decode ? <HomeFeed userInfo={decode} /> : <UnisalaIntro />
                            }
                        </IonCol>
                        {width > 1000 && views.greaterThan1000}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}
