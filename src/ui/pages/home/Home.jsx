import { useState, useEffect } from "react"
import {
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonIcon,
    IonText,
    IonCard,
    IonItem,
    IonAvatar,
    IonLabel,
    IonHeader,
    IonPage
} from "@ionic/react"
import "./Home.css"
import { personCircle } from "ionicons/icons"
import SearchInput from "../../component/SearchInput"
import BadgesTab from "./BadgeTab"
import Post from "../../component/post/index"
import Authentication from "../../component/authentication"
import { useQuery } from "@apollo/client"
import VerifyPostPop from "../../component/verifyPostPop/verifyPostPop"
import jwtDecode from "jwt-decode"
import GetProfileCard from "../../../graphql/user/GetProfileCard"
import unisalaImg from "../../../assets/unisala-intro.png"
import HomeFeed from "./HomeFeed"
import UnisalaIntro from "./UnisalaIntro"
import useDocTitle from "../../../hooks/useDocTitile"

export const Home = ({ setPopup }) => {
    useDocTitle("Unisala")
    const accessToken = localStorage?.getItem("accessToken")
    const decode = accessToken && jwtDecode(accessToken)
    const profileData = useQuery(GetProfileCard, {
        variables: {
            username: decode?.username
        }
    })

    const [width, setWidth] = useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    const [activeProfile, setActiveProfile] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    return (
        <IonPage>
            <IonContent
                color="light"
            >
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
                    }}
                >
                    <IonRow
                        style={{
                            justifyContent: "flex-start",
                            margin: "0 auto"
                        }}
                        className="max-width-container"
                    >
                        {width > 768 && (
                            <IonCol
                                size="auto"
                                style={{
                                    height: "100%",
                                    position: "sticky",
                                    top: "15px",
                                    overflow: "auto"
                                }}
                            >
                                {decode
                                    ? <>
                                        <IonCard>
                                            <div className="aside-profile">
                                                <div>
                                                    <IonAvatar
                                                        style={{
                                                            width: "60px",
                                                            height: "60px"
                                                        }}
                                                    >
                                                        <img
                                                            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1670164432~exp=1670165032~hmac=36b9b40ac0ed5b3a668c8bd6a3773cb706f13b46413881b4a4f1079241cb9eb5"
                                                            alt=""
                                                        />
                                                    </IonAvatar>
                                                </div>
                                            </div>
                                            <div className="aside-profile-details">
                                                <IonText
                                                    className="flex justify-content-center"
                                                    color="dark"
                                                >
                                                    <h6>
                                                        {profileData?.data?.getUser
                                                            ?.user?.firstName +
                                                            " " +
                                                            profileData?.data?.getUser
                                                                ?.user?.lastName}
                                                    </h6>
                                                    <img
                                                        src="https://www.svgrepo.com/show/178831/badges-money.svg"
                                                        alt=""
                                                        width={20}
                                                    />
                                                </IonText>
                                                <IonText color="medium">
                                                    <p>
                                                        @
                                                        {
                                                            profileData?.data?.getUser
                                                                ?.user?.username
                                                        }
                                                    </p>
                                                </IonText>
                                            </div>
                                        </IonCard>
                                        <IonCard className="badges-card">
                                            <IonText color="dark">
                                                <h6
                                                    style={{
                                                        padding: "10px"
                                                    }}
                                                >
                                                    Badges
                                                </h6>
                                            </IonText>
                                            <BadgesTab
                                                activeTab={activeTab}
                                                setActiveTab={setActiveTab}
                                            />
                                            {profileData?.user?.badges?.earnedBadges?.map(
                                                (item, index) => {
                                                    return (
                                                        <IonItem
                                                            style={{
                                                                margin: "0px",
                                                                padding: "0px"
                                                            }}
                                                            lines="none"
                                                            key={index}
                                                        >
                                                            <IonAvatar slot="start">
                                                                <img
                                                                    src={
                                                                        "https://www.svgrepo.com/show/178831/badges-money.svg"
                                                                    }
                                                                />
                                                            </IonAvatar>
                                                            <IonLabel>
                                                                <h2
                                                                    style={{
                                                                        margin: 0
                                                                    }}
                                                                >
                                                                    {item?.title}
                                                                </h2>
                                                                <p
                                                                    style={{
                                                                        margin: 0
                                                                    }}
                                                                >
                                                                    {item?.description}
                                                                </p>
                                                            </IonLabel>
                                                        </IonItem>
                                                    )
                                                }
                                            )}
                                        </IonCard>
                                    </>
                                    : <IonCard
                                        style={{
                                            maxWidth: "250px"
                                        }}>
                                        <img src={unisalaImg} alt="unisala" />
                                        <h5 className="black-text"
                                            style={{
                                                textAlign: "center",
                                                fontSize: "1.2rem",
                                                lineHeight: "26px",
                                                padding: "5px"
                                            }}>
                                            If studying abroad is your dream, making it simple is ours! ✅
                                        </h5>
                                    </IonCard>
                                }
                            </IonCol>
                        )}

                        <IonCol
                            style={{
                                maxWidth: "700px",
                                margin: "auto",
                                minHeight: "calc(90vh)"
                            }}
                        >
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

                        {width > 1000 && (
                            <IonCol
                                size="auto"
                                style={{
                                    maxWidth: "250px",
                                    height: "90vh",
                                    position: "sticky",
                                    top: "15px",
                                    overflow: "auto"
                                }}
                            >
                                <IonCard>
                                    <IonText color="dark">
                                        <h6 style={{ padding: "10px" }}>
                                            Top Universities
                                        </h6>
                                    </IonText>

                                    {[
                                        {
                                            location: "Cambridge, MA",
                                            name: "Harvard University",
                                            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ85CYmrXtcB5lixCO4OD31B0lH2bSUWnYlwzXt&s=0"
                                        },
                                        {
                                            location: "New York, NY",
                                            name: "New York, NY",
                                            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzvc2BzBLe6O21S54mP4emzDPX0BV7Uha9kh0V&s=0"
                                        },
                                        {
                                            location: "Princeton, NJ",
                                            name: "Princeton University",
                                            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNw-o9FeNO_CPrOI_0GXJubkKMN1ORUHGILlo&s=0"
                                        },
                                        {
                                            location: "Stanford, CA",
                                            name: "Stanford University",
                                            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAc3w5Bl9m8O-BjtEBT5ag4o95voXy8uJQ1iC&s=0"
                                        },
                                        {
                                            location: "Berkeley, CA",
                                            name: "University of California",
                                            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuS-57V0-jthS3Xt7V-w-H3aYD2FfUg0rZEOAx&s=0"
                                        },
                                        {
                                            location: "Philadelphia, PA",
                                            name: "California Institute of Technology",
                                            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbypxZ6lLq4T3ZXxprpRysIjk03Zbr2rtBzLu2&s=0"
                                        }
                                    ].map((item, index) => {
                                        return (
                                            <IonItem
                                                style={{
                                                    margin: "0px",
                                                    padding: "0px"
                                                }}
                                                lines="none"
                                                key={index}
                                            >
                                                <IonAvatar slot="start">
                                                    <img src={item.img} />
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2
                                                        style={{
                                                            margin: 0
                                                        }}
                                                    >
                                                        {item.name}
                                                    </h2>
                                                    <p
                                                        style={{
                                                            margin: 0
                                                        }}
                                                    >
                                                        {item.location}
                                                    </p>
                                                </IonLabel>
                                            </IonItem>
                                        )
                                    })}
                                </IonCard>
                            </IonCol>
                        )}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}
