import { useState, useContext } from "react"

import CourseCard from "component/courseCard"
import Thread from "component/thread"
import { Link } from "react-router-dom"
import Events from "./Events"
import { useQuery } from "@apollo/client"
import { GetAllPostByOrgSpaceID } from "graphql/user"
import emptyState from "assets/emptyState.png"
import { OrgContext } from "."

import { USER_SERVICE_GQL } from "servers/types"
import StateMessage from "component/stateMessage/index"

export const SpaceFeed = () => {
  const { orgId } = useContext(OrgContext)

  const [postList, setPostList] = useState([])
  const [page, setPage] = useState(0)

  const { data, refetch } = useQuery(GetAllPostByOrgSpaceID, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: orgId, page: 1 }
  })

  const { getAllPostByOrgSpaceId: allPosts } = data || {}

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
      <div style={{ margin: "10px 0px 0px 0px" }} className="ThreadContainer">
        {allPosts?.data?.length === 0 && (
          <StateMessage title="Be the first one to post in this space">
            <img src={emptyState} alt="empty state" className="state-img" />
          </StateMessage>
        )}

        <Events />

        {Array.isArray(allPosts?.data) &&
          allPosts?.data.map((post, index) => {
            // const { post } = item
            console.log("post", post)
            return post.type === "uni" ? (
              <Link key={index} to={`/university/${post?.name}`}>
                <CourseCard allProps={post} />
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
