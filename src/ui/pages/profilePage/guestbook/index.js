// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
    IonCard,
    IonCardContent,
    IonText,
    IonButton,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonIcon
} from "@ionic/react"
import StateMessage from "../../../component/stateMessage"
import emptyState from "../../../../assets/emptyState.png"
import "./index.css"
import { useLazyQuery } from "@apollo/client"
import receivedGuestbookList from "../../../../graphql/user/receivedGuestbookList"
import AddGuestBookPop from "./AddGuestBookPop"
import moment from "moment"
// eslint-disable-next-line
import jwt_decode from "jwt-decode"
import { ellipsisVertical } from "ionicons/icons"
import MorePop from "./MorePop"

function index({ userId }) {
    const [page, setPage] = React.useState(0)
    const accessToken = localStorage.getItem("accessToken")
    const decode = accessToken && jwt_decode(accessToken)
    const [isOpen, setIsOpen] = React.useState(false)
    const [guestbookList, setGuestbookList] = React.useState([])

    const [getGuestBookList, { data }] = useLazyQuery(receivedGuestbookList, {
        variables: {
            userId: userId,
            page: page,
            pageSize: 10
        }
    })

    useEffect(() => {
        getGuestBookList()
    }, [])
    useEffect(() => {
        setGuestbookList(data?.receivedGuestbookList?.guestbook)
    }, [data])
    const guestbook = [
        {
            img: "https://i.pinimg.com/originals/51/25/a4/5125a4418270338cc5f9c246fc1e0c9d.jpg",
            name: "Random Name",
            username: "@randomName",
            date: "14 Apr 2022"
        },
        {
            img: "https://i.pinimg.com/originals/51/25/a4/5125a4418270338cc5f9c246fc1e0c9d.jpg",
            name: "User Name",
            username: "@username",
            date: "14 Jun 2022"
        },
        {
            img: "https://i.pinimg.com/originals/51/25/a4/5125a4418270338cc5f9c246fc1e0c9d.jpg",
            name: "Keep Name",
            username: "@keep name",
            date: "14 Feb 2022"
        },
        {
            img: "https://i.pinimg.com/originals/51/25/a4/5125a4418270338cc5f9c246fc1e0c9d.jpg",
            name: "Random Name",
            username: "@randomName",
            date: "14 Apr 2022"
        }
    ]
    const guestbookLists = () => {
        if (guestbook.length === 0) {
            return (
                <StateMessage
                    title="Be the first to leave a message!"
                    subtitle="All the guestbook messages be visible here"
                >
                    <img
                        src={emptyState}
                        alt="empty state"
                        className="state-img"
                    />
                </StateMessage>
            )
        }
        return (
            <IonCardContent>
                <IonList lines="full">
                    {Array.isArray(guestbookList) &&
                        guestbookList.map((guestbookItem, i) => {
                            const { img, firstName, lastName, username } =
                                guestbookItem?.user || {}

                            const { message, date } = guestbookItem || {}
                            return (
                                <IonItem key={i} className="guestbook-li">
                                    <IonAvatar slot="start">
                                        <img src={img} />
                                    </IonAvatar>
                                    <IonLabel>
                                        <div className="inline-flex">
                                            <h2>
                                                {firstName + " " + lastName}
                                            </h2>
                                            <p className="p-grey">
                                                @{username}
                                            </p>
                                            <p className="p-grey">
                                                {moment(date).format(
                                                    "DD MMM YYYY"
                                                )}
                                            </p>
                                        </div>
                                        <p>{message}</p>
                                    </IonLabel>
                                    <IonIcon icon={ellipsisVertical} />
                                    <MorePop morePop={true} />
                                </IonItem>
                            )
                        })}
                </IonList>
            </IonCardContent>
        )
    }
    return (
        <>
            {userId !== decode?._id && (
                <IonCard className="mb-2">
                    <IonCardContent className="card-bb">
                        <h1>Guestbook</h1>
                    </IonCardContent>
                    <IonCardContent>
                        <p>
                            Leave a comment below. It could be anything –
                            appreciation, information, wisdom, or even humor.
                            Surprise me!
                        </p>
                    </IonCardContent>
                    <IonCardContent className="guestbook-post">
                        <IonText>
                            <h2>Sign Fulkumari Waiba&apos;s Guestbook</h2>
                            <p>Share a message here.</p>
                        </IonText>
                        <IonButton
                            onClick={() => {
                                setIsOpen(true)
                            }}
                            mode="ios"
                        >
                            Leave a message
                        </IonButton>
                        <AddGuestBookPop
                            setIsOpen={setIsOpen}
                            userId={userId}
                            isOpen={isOpen}
                        />
                    </IonCardContent>
                </IonCard>
            )}
            {Array.isArray(guestbookList) ? (
                <IonCard className="mb-2">{guestbookLists()}</IonCard>
            ) : (
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
        </>
    )
}

export default index
