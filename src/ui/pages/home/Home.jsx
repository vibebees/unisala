// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
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
    IonPage,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from "@ionic/react"
import "./Home.css"
import { personCircle } from "ionicons/icons"
import CourseCard from "../../component/CourseCard"
import Thread from "./thread"
import { Link } from "react-router-dom"
import SearchInput from "../../component/SearchInput"
import BadgesTab from "./BadgeTab"
import Post from "../../component/post/index"
import Authentication from "../../component/authentication"
import GetUserPost from "../../../graphql/user/GetUserPost"
import { useLazyQuery, useQuery } from "@apollo/client"
import VerifyPostPop from "../../component/verifyPostPop/verifyPostPop"
// eslint-disable-next-line
import jwt_decode from "jwt-decode"
import ThreadScaletion from "../../component/scaleton/ThreadScaletion/ThreadScaletion"
import axios from "axios"
import GetProfileCard from "../../../graphql/user/GetProfileCard"
import urls from "../../../utils/urls"
export const Home = ({ setPopup }) => {
    const accessToken = localStorage?.getItem("accessToken")
    const decode = accessToken && jwt_decode(accessToken)
    const profileData = useQuery(GetProfileCard, {
        variables: {
            username: decode?.username
        }
    })

    const [width, setWidth] = React.useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    const [activeProfile, setActiveProfile] = React.useState(false)
    const [postList, setPostList] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [getNextPage, { loading, data }] = useLazyQuery(
        GetUserPost(decode?._id, page)
    )

    useEffect(() => {
        getNextPage()
    }, [page])

    const [activeTab, setActiveTab] = React.useState(0)

    useEffect(() => {
        axios.get(urls["base"] + "/homepagefeed").then((res) => {
            setPostList(res?.data?.feed)
        })
    }, [])

    return (
        <IonPage>
            <IonContent
                style={{
                    margin: "0px",
                    padding: "0px"
                }}
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
                            justifyContent: "flex-start"
                        }}
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
                            </IonCol>
                        )}
                        <IonCol
                            style={{
                                maxWidth: "700px",
                                margin: "auto",
                                minHeight: "calc(90vh)"
                            }}
                        >
                            {width >= 768 && (
                                <IonCard
                                    style={{
                                        margin: "20px 0px"
                                    }}
                                    onClick={() => {
                                        setPopup(true)
                                    }}
                                >
                                    <Post />
                                </IonCard>
                            )}

                            <div
                                style={{
                                    margin: "10px 0px 0px 0px"
                                }}
                            >
                                {Array.isArray(postList) &&
                                    postList.map((item, index) => {
                                        const { post } = item
                                        return item.type === "uni" ? (
                                            <Link
                                                key={index}
                                                to={`/university/${post?.name}`}
                                            >
                                                <CourseCard
                                                    image={post?.image}
                                                    name={post?.name}
                                                    description={
                                                        post?.description
                                                    }
                                                    city={post?.location}
                                                    review={post?.review}
                                                    average={
                                                        post?.averageRating
                                                    }
                                                    acceptanceRate={
                                                        post?.acceptanceRate
                                                    }
                                                    act={post?.actRange}
                                                    type={post?.type}
                                                />
                                            </Link>
                                        ) : (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    borderTop:
                                                        "1px solid #e0e0e0"
                                                }}
                                                className="thread-card"
                                                key={index}
                                            >
                                                <Thread
                                                    commentlist={
                                                        item?.post?.post
                                                    }
                                                    id={item?._id}
                                                />
                                            </div>
                                        )
                                    })}
                            </div>
                            {loading &&
                                ["0", "1", "2"].map((item) => {
                                    return <ThreadScaletion key={item} />
                                })}

                            {data?.getUserPost?.Posts && (
                                <IonCard>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            padding: "50px"
                                        }}
                                    >
                                        <img
                                            style={{
                                                filter: "grayscale(80%)"
                                            }}
                                            src="https://cdn-icons-png.flaticon.com/128/7486/7486744.png"
                                            alt=""
                                        />
                                        <IonText color="dark">
                                            <h1
                                                style={{
                                                    fontSize: "2.5rem"
                                                }}
                                            >
                                                Oops!
                                            </h1>
                                        </IonText>
                                        <br />
                                        <IonText color="medium">
                                            <h2>No data found.</h2>
                                        </IonText>
                                    </div>
                                </IonCard>
                            )}
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
                                        <h6
                                            style={{
                                                padding: "10px"
                                            }}
                                        >
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
                <IonInfiniteScroll
                    onIonInfinite={(e) => {
                        setPage(page + 1)
                        getNextPage()
                        setTimeout(() => e.target.complete(), 500)
                    }}
                >
                    <IonInfiniteScrollContent loadingText=""></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    )
}
