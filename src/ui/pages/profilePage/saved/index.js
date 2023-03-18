import { useEffect, useState } from "react"
import {
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import StateMessage from "../../../component/stateMessage"
import emptyState from "../../../../assets/emptyState.png"
import { useLazyQuery } from "@apollo/client"
import { GetSavedList } from "../../../../graphql/user/"
import Thread from "../../../component/thread"
import CourseCard from "../../../component/courseCard"
import { Link } from "react-router-dom"
import jwtDecode from "jwt-decode"
import ThreadScaletion from "../../../component/scaleton/ThreadScaletion/ThreadScaletion"
import { USER_SERVICE_GQL } from "../../../../servers/types"

function index({ userId, firstName }) {
  const accessToken = localStorage.getItem("accessToken")
  const decode = accessToken && jwtDecode(accessToken)
  const [page, setPage] = useState(0)

  const [getSavedList, { data, loading }] = useLazyQuery(GetSavedList, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      userId,
      page: page
    }
  })

  useEffect(() => {
    getSavedList()
  }, [])

  const [threads, setThreads] = useState([])

  useEffect(() => {
    if (data) setThreads((pre) => [...pre, ...data?.savedList?.Posts])
  }, [data])

  if (!data?.savedList.Posts.length) {
    return (
      <IonCard>
        <StateMessage
          title={
            decode?._id === userId
              ? `You have not saved anything yet!`
              : `${firstName} has not saved anything yet!`
          }
          subtitle="All the saved posts will be visible here"
        >
          <img src={emptyState} alt="empty state" className="state-img" />
        </StateMessage>
      </IonCard>
    )
  }

  const userThreads = () => {
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
                <Thread thread={item} id={item?._id} />
              </div>
            )
          })}

        {loading &&
          ["0", "1", "2"].map((item) => {
            return <ThreadScaletion key={item} />
          })}

        {/* <IonInfiniteScroll
                    onIonInfinite={(e) => {
                        setPage(page + 1)
                        getSavedList({
                            variables: {
                                userId: decode?._id,
                                page: page + 1
                            }
                        })
                        setTimeout(() => e.target.complete(), 500)
                    }}
                >
                    <IonInfiniteScrollContent loadingText=""></IonInfiniteScrollContent>
                </IonInfiniteScroll> */}
      </div>
    )
  }
  return <div className="user-thread">{userThreads()}</div>
}

export default index
