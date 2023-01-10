// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react"
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

const ProfilePage = () => {
    let windowWidth = useWindowWidth()
    const [tab, setTab] = useState(0)
    const { username } = useParams()
    const { data } = useQuery(GetUser(username))

    const { getUser } = data || {}
    useEffect(() => {
        // getUser &&
    }, [getUser])

    const decode = jwtDecode(localStorage.getItem("accessToken"))

    // const user = userDetails.find((user) => user.id === username)

    // if (user === undefined) {
    //     return (
    //         <IonContent>
    //             <IonGrid className="max-width-container">
    //                 <IonText>User not found!!</IonText>
    //             </IonGrid>
    //         </IonContent>
    //     )
    // }

    const myProfile = username === decode?.username
    const {
        firstName,
        name,
        lastName,
        picture,
        profileBanner,
        oneLinerBio,
        location,
        birthday,
        socialLinks,
        about,
        badges,
        education,
        testScore,
        _id
    } = getUser?.user || {}
    const profileHeaderData = {
        name,
        firstName,
        lastName,
        username,
        picture,
        profileBanner,
        oneLinerBio,
        location,
        birthday,
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
                        {tab === 1 && <Threads />}
                        {tab === 2 && <Guestbook userId={_id} />}
                        {/* {tab === 3 && <EasyApplied />} */}
                        {tab === 4 && <Saved />}
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
