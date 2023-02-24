// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
    IonText,
    IonCard,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from "@ionic/react"
import CourseCard from "../../component/CourseCard"
import Thread from "./thread"
import { Link } from "react-router-dom"
import ThreadScaletion from "../../component/scaleton/ThreadScaletion/ThreadScaletion"
import urls from "../../../utils/urls"
import { useLazyQuery } from "@apollo/client"
import axios from "axios"
import { GetUserPost } from "../../../graphql/user"

const HomeFeed = ({ userInfo }) => {
    const [postList, setPostList] = React.useState([])
    const [page, setPage] = React.useState(0)

    const [getNextPage, { loading, data }] = useLazyQuery(
        GetUserPost(userInfo?._id, page)
    )
    useEffect(() => {
        axios.get(urls["base"] + "/user/homepagefeed").then((res) => {
            setPostList(res?.data?.feed)
        })
    }, [])
    return (
        <>
            <div style={{ margin: "10px 0px 0px 0px" }} >
                {Array.isArray(postList) &&
                    postList.map((item, index) => {
                        const { post } = item
                            return item.type === "uni" ? (
                                <Link key={index} to={`/university/${post?.name}`}>
                                    <CourseCard
                                        image={post?.image}
                                        name={post?.name}
                                        description={post?.description}
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
                                        borderTop: "1px solid #e0e0e0"
                                    }}
                                    className="thread-card"
                                    key={index}
                                >
                                    <Thread commentlist={ item?.post?.post } id={item?._id} />
                                </div>
                            )
                    })}
            </div>

            {loading && ["0", "1", "2"].map((item) => {
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
                        <img style={{ filter: "grayscale(80%)" }} src="https://cdn-icons-png.flaticon.com/128/7486/7486744.png" alt="" />
                        <IonText color="dark">
                            <h1 style={{ fontSize: "2.5rem" }} >Oops!</h1>
                        </IonText>
                        <br />
                        <IonText color="medium">
                            <h2>No data found.</h2>
                        </IonText>
                    </div>
                </IonCard>
            )}

            <IonInfiniteScroll
                onIonInfinite={(e) => {
                    setPage(page + 1)
                    getNextPage()
                    setTimeout(() => e.target.complete(), 500)
                }}
            >
                <IonInfiniteScrollContent loadingText=""></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </>
    )
}

export default HomeFeed
