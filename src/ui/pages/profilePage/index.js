import { useState } from "react"
import { useParams } from "react-router"
import {
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle
} from "@ionic/react"
import useWindowWidth from "../../../hooks/useWindowWidth"
import TopUniversitySidebar from "../../component/TopUniversitySidebar"
import ProfileHeader from "./profileHeader"
import ProfileBody from "./profileBody"
import Threads from "./threads"
import Guestbook from "./guestbook"
import Saved from "./saved"
import "./index.css"
import jwtDecode from "jwt-decode"
import { useQuery } from "@apollo/client"
import GetUser from "../../../graphql/user/GetUser"
import useDocTitle from "../../../hooks/useDocTitile"
import noResultsFound from "../../../assets/no-results.jpg"

const ProfilePage = () => {
    let windowWidth = useWindowWidth()
    const [tab, setTab] = useState(0)
    const { username } = useParams()
    const { data } = useQuery(GetUser(username))
    useDocTitle(username)

    const { getUser } = data || {}
    const accessToken = localStorage.getItem("accessToken")
    const decode = accessToken ? jwtDecode(accessToken) : {}
    const myProfile = username === decode?.username
    const {
        firstName,
        lastName,
        picture,
        profileBanner,
        oneLinerBio,
        location,
        socialLinks,
        about,
        badges,
        education,
        testScore,
        _id
    } = getUser?.user || {}
    const profileHeaderData = {
        firstName,
        lastName,
        username,
        picture,
        profileBanner,
        oneLinerBio,
        location,
        socialLinks,
        myProfile
    }
    const profileBodyData = {
        about,
        badges,
        education,
        testScore,
        myProfile
    }

    if (!getUser?.user) {
        return (
            <IonContent>
                <IonCard
                    style={{ textAlign: "center", marginInline: "auto" }}
                    className="max-width-container"
                >
                    <img alt="unisala: no results found" src={noResultsFound} />
                    <IonCardHeader>
                        <IonCardTitle>
                            Sorry, this page is not available. &#9785;
                        </IonCardTitle>
                        <IonCardSubtitle>
                            The link you followed may be broken, or the page may
                            have been removed.
                        </IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
            </IonContent>
        )
    }

    return (
        <IonContent>
            <IonGrid className="max-width-container">
                <IonRow>
                    <IonCol>
                        <ProfileHeader
                            tab={tab}
                            setTab={setTab}
                            data={profileHeaderData}
                        />
                        {tab === 0 && getUser?.user && (
                            <ProfileBody data={profileBodyData} />
                        )}
                        {tab === 1 && (
                            <Threads userId={_id} firstName={firstName} />
                        )}
                        {tab === 2 && (
                            <Guestbook userId={_id} firstName={firstName} />
                        )}
                        {tab === 4 && (
                            <Saved userId={_id} firstName={firstName} />
                        )}
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
