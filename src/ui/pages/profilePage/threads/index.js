// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import {
    IonCard,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from "@ionic/react"
import StateMessage from "../../../component/stateMessage"
import emptyState from "../../../../assets/emptyState.png"
import locked from "../../../../assets/private.png"
import CommentSec from "../../university/tabDetails/Discussion"
import { useLazyQuery, useQuery } from "@apollo/client"
import GetUserPost from "../../../../graphql/user/GetUserPost"
import Thread from "../../home/thread"
import CourseCard from "../../../component/CourseCard"
import { Link } from "react-router-dom"
import "./index.css"
import jwtDecode from "jwt-decode"
import ThreadScaletion from "../../../component/scaleton/ThreadScaletion/ThreadScaletion"

function index() {
    const decode = jwtDecode(localStorage.getItem("accessToken"))
    const [page, setPage] = useState(0)
    const [getUserPost, { data, loading }] = useLazyQuery(
        GetUserPost(decode?._id, page),
        {
            fetchPolicy: "network-only"
        }
    )
    // const { loading, error, data } = useQuery(GetUserPost(decode?._id, 0))
    const [threads, setThreads] = useState([])
    useEffect(() => {
        getUserPost()
    }, [])
    useEffect(() => {
        data?.getUserPost?.Posts &&
            Array.isArray(data?.getUserPost?.Posts) &&
            setThreads((pre) => [...pre, ...data?.getUserPost?.Posts])
    }, [data])
    const isPrivate = false
    const userThreads = () => {
        if (isPrivate) {
            return (
                <StateMessage
                    title="Fulkumari lives a very private life!"
                    subtitle="Connect with Fulkumari to see Fulkumari's threads activities."
                >
                    <img src={locked} alt="empty state" className="state-img" />
                </StateMessage>
            )
        }
        if (Array.isArray(threads) && threads.length === 0) {
            return (
                <StateMessage
                    title="Fulkumari has no thread activities yet!"
                    subtitle="All the published threads will be visible here"
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
            <div>
                {Array.isArray(threads) &&
                    threads.map((item, index) => {
                        return item.type === "university" ? (
                            <Link key={index} to={`/university/${index}`}>
                                <CourseCard
                                    image={item.image}
                                    Title={item.Title}
                                    description={item.description}
                                    locations={item.location}
                                    review={item.review}
                                    avarage={item.avarage}
                                    acceptance={item.acceptance}
                                    act={item.act}
                                    type={item.type}
                                />
                            </Link>
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    marginTop: "10px",
                                    borderTop: "1px solid #e0e0e0"
                                }}
                                className="thread-card"
                                key={index}
                            >
                                <Thread commentlist={item} id={item?._id} />
                            </div>

                            // <IonCard
                            //     key={index}
                            //     style={{
                            //         width: "98%",
                            //         margin: "10px auto",
                            //         borderTop: "1px solid #e0e0e0",
                            //         padding: "10px 10px 0px 10px"
                            //     }}
                            // >
                            //     <Thread commentlist={[item]} />
                            // </IonCard>
                        )
                    })}

                {loading &&
                    ["0", "1", "2"].map((item) => {
                        return <ThreadScaletion key={item} />
                    })}

                <IonInfiniteScroll
                    onIonInfinite={(e) => {
                        setPage(page + 1)
                        getUserPost()
                        setTimeout(() => e.target.complete(), 500)
                    }}
                >
                    <IonInfiniteScrollContent loadingText=""></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </div>
        )
    }
    return <div className="user-thread">{userThreads()}</div>
}

export default index
