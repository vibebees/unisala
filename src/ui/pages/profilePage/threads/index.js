import { useEffect, useState } from "react"
import {
    IonCard,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from "@ionic/react"
import StateMessage from "../../../component/stateMessage"
import emptyState from "../../../../assets/emptyState.png"
// import CommentSec from "../../university/tabDetails/Discussion"
import { useLazyQuery } from "@apollo/client"
import { GetUserPost } from "../../../../graphql/user"
import Thread from "../../home/thread"
import CourseCard from "../../../component/CourseCard"
import { Link } from "react-router-dom"
import "./index.css"
import ThreadScaletion from "../../../component/scaleton/ThreadScaletion/ThreadScaletion"
import jwtDecode from "jwt-decode"

function index({ userId, firstName }) {
    const accessToken = localStorage.getItem("accessToken")
    const decode = accessToken && jwtDecode(accessToken)
    const [page, setPage] = useState(0)
    const [getUserPost, { data, loading }] = useLazyQuery(
        GetUserPost(userId, page),
        {
            fetchPolicy: "network-only"
        }
    )
    const [threads, setThreads] = useState([])

    useEffect(() => {
        data?.getUserPost?.Posts &&
            Array.isArray(data?.getUserPost?.Posts) &&
            setThreads((pre) => [...pre, ...data?.getUserPost?.Posts])
    }, [data])

    const userThreads = () => {
        if (Array.isArray(threads) && threads.length === 0) {
            return (
                <IonCard>
                    <StateMessage
                        title={
                            decode?._id === userId
                                ? `You don't have any thread activities!`
                                : `${firstName} has no thread activites!`
                        }
                        subtitle="All the published threads will be visible here"
                    >
                        <img
                            src={emptyState}
                            alt="empty state"
                            className="state-img"
                        />
                    </StateMessage>
                </IonCard>
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
