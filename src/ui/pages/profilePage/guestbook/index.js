import { useState, useEffect } from "react"
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
import { receivedGuestbookList } from "../../../../graphql/user"
import AddGuestBookPop from "./AddGuestBookPop"
import moment from "moment"
import jwtDecode from "jwt-decode"
import { ellipsisVertical } from "ionicons/icons"
import MorePop from "./MorePop"
import ThreadScaletion from "../../../component/scaleton/ThreadScaletion/ThreadScaletion"

function index({ userId, firstName }) {
    const [page, setPage] = useState(0)
    const accessToken = localStorage.getItem("accessToken")
    const decode = accessToken && jwtDecode(accessToken)
    const [isOpen, setIsOpen] = useState(false)
    const [guestbookList, setGuestbookList] = useState([])

    const [getGuestBookList, { data, loading }] = useLazyQuery(
        receivedGuestbookList,
        {
            variables: {
                userId: userId,
                page: page,
                pageSize: 10
            }
        }
    )

    useEffect(() => {
        getGuestBookList()
    }, [])
    useEffect(() => {
        setGuestbookList(data?.receivedGuestbookList?.guestbook)
    }, [data])

    if (loading) {
        return ["0", "1", "2"].map((item) => {
            return <ThreadScaletion key={item} />
        })
    }

    const guestbookLists = () => {
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
                                    <MorePop morePop={false} />
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
                            <h2>Sign {firstName} Waiba&apos;s Guestbook</h2>
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

            {!guestbookList?.length && (
                <IonCard>
                    <StateMessage
                        title={
                            userId === decode?._id
                                ? "You haven't received any messages!"
                                : `${firstName} has not received any messages`
                        }
                        subtitle="All the guestbook messages will be visible here"
                    >
                        <img
                            src={emptyState}
                            alt="empty state"
                            className="state-img"
                        />
                    </StateMessage>
                </IonCard>
            )}

            {Array.isArray(guestbookList) && guestbookList?.length && (
                <IonCard className="mb-2">{guestbookLists()}</IonCard>
            )}
        </>
    )
}

export default index
