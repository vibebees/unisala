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
import { useSelector } from "react-redux"
import VerifyPostPop from "../../component/verifyPostPop/verifyPostPop"
import { GetProfileCard } from "../../../graphql/user"
import unisalaImg from "../../../assets/unisala-intro.png"
import HomeFeed from "./HomeFeed"
import UnisalaIntro from "./UnisalaIntro"
import { screenLessThan768 } from "./screens.lessThan768"
import { screensMoreThan768 } from "./screens.moreThan768"
import { screenGreaterThan1000 } from "./screens.greater.1000"
import useDocTitle from "../../../hooks/useDocTitile"
import { USER_SERVICE_GQL } from "../../../servers/types"
import CreateAPost from "../../component/post/CreateAPost"

export const Home = () => {
    useDocTitle("Unisala")
    const
        { user, loggedIn } = useSelector((store) => store?.userProfile),
        profileData = loggedIn && useQuery(GetProfileCard, {
            context: { server: USER_SERVICE_GQL },
            variables: {
                username: user?.username
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
            greaterThan768: screensMoreThan768({ activeTab, setActiveTab, unisalaImg, profileData, loggedIn }),
            lessThan768: screenLessThan768({ setActiveProfile, personCircle, activeProfile, loggedIn, username: user.username })
        },
        [createAPostPopUp, setCreateAPostPopUp] = useState(false),
        [verfiyAPostPopUp, setVerifyAPostPopUp] = useState(false)

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
                <VerifyPostPop setPopup = {setVerifyAPostPopUp} popup = {verfiyAPostPopUp}/>
                  <CreateAPost setPopup={setCreateAPostPopUp} popup={createAPostPopUp} />

                {width < 768 && views.lessThan768}
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
                            {loggedIn && width >= 768 && (
                                <IonCard style={{ margin: "20px 0px" }} onClick={() => {
                                    setCreateAPostPopUp(true)
                                }} >
                                    <Post />
                                </IonCard>
                            )}
                            {
                                loggedIn ? <HomeFeed userInfo={user} /> : <UnisalaIntro />
                            }
                        </IonCol>
                        {width > 1000 && views.greaterThan1000}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}
