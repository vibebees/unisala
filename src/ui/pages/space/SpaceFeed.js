import { useState, useEffect } from "react"
import {
  IonText,
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import CourseCard from "../../component/courseCard"
import Thread from "../../component/thread"
import { Link } from "react-router-dom"
import ThreadScaletion from "../../component/scaleton/ThreadScaletion/ThreadScaletion"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GetAllPostBySpaceCategoryID, GetUserPost } from "../../../graphql/user"
import { userServer } from "../../../servers/endpoints"
import axios from "axios"
import { InterviewScheduler } from "../../component/interviewScheduler"
import { USER_SERVICE_GQL } from "../../../servers/types"
export const SpaceFeed = ({ userInfo, spaceId }) => {
  const [postList, setPostList] = useState([])
  const [page, setPage] = useState(0)

  const { data, error, refetch } = useQuery(GetAllPostBySpaceCategoryID, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: spaceId }
  })

  const { getAllPostBySpaceCategoryID: allPosts } = data || {}

  // const [getNextPage, { loading, data }] = useLazyQuery(
  //   GetUserPost(userInfo?._id, page)
  // )
  // useEffect(() => {
  //   axios.get(userServer + "/homepagefeed").then((res) => {
  //     setPostList(res?.data?.feed)
  //   })
  // }, [])
  return (
    <>
      <div style={{ margin: "10px 0px 0px 0px" }}>
        {Array.isArray(allPosts?.posts) &&
          allPosts?.posts.map((post, index) => {
            // const { post } = item
            return post.type === "uni" ? (
              <Link key={index} to={`/university/${post?.name}`}>
                <CourseCard
                  image={post?.image}
                  name={post?.name}
                  description={post?.description}
                  city={post?.location}
                  review={post?.review}
                  average={post?.averageRating}
                  acceptanceRate={post?.acceptanceRate}
                  act={post?.actRange}
                  type={post?.type}
                />
              </Link>
            ) : (
              <div
                style={{
                  width: "100%",
                  marginTop: "10px"
                }}
                key={index}
              >
                <Thread thread={post} refetch={refetch} id={post?._id} />
              </div>
            )
          })}
      </div>

      {/* {loading &&
        ["0", "1", "2"].map((item) => {
          return <ThreadScaletion key={item} />
        })} */}

      {/* {data?.getUserPost?.Posts && (
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
              style={{ filter: "grayscale(80%)" }}
              src="https://cdn-icons-png.flaticon.com/128/7486/7486744.png"
              alt=""
            />
            <IonText color="dark">
              <h1 style={{ fontSize: "2.5rem" }}>Oops!</h1>
            </IonText>
            <br />
            <IonText color="medium">
              <h2>No data found.</h2>
            </IonText>
          </div>
        </IonCard>
      )} */}

      {/* <IonInfiniteScroll
        onIonInfinite={(e) => {
          setPage(page + 1)
          getNextPage()
          setTimeout(() => e.target.complete(), 500)
        }}
      >
        <IonInfiniteScrollContent loadingText=""></IonInfiniteScrollContent>
      </IonInfiniteScroll> */}
    </>
  )
}
