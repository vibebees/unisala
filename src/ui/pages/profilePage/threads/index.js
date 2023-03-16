import { useEffect, useState } from "react"
import {
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import { Link } from "react-router-dom"
import StateMessage from "../../../component/stateMessage"
import emptyState from "../../../../assets/emptyState.png"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GetUserPost } from "../../../../graphql/user/"
import Thread from "../../../component/thread"
import CourseCard from "../../../component/courseCard"
import ThreadScaletion from "../../../component/scaleton/ThreadScaletion/ThreadScaletion"
import jwtDecode from "jwt-decode"

function index({ userId, firstName }) {
  const accessToken = localStorage.getItem("accessToken")
  const decode = accessToken && jwtDecode(accessToken)
  const [page, setPage] = useState(0)
  const { data, loading } = useQuery(GetUserPost(userId, page), {
    context: { server: "USER_SERVICE_GQL" }
  })
  const { Posts } = data?.getUserPost || []
  const userThreads = () => {
    if (loading) {
      return ["0", "1", "2"].map((item) => {
        return <ThreadScaletion key={item} />
      })
    }

    if (Array.isArray(Posts) && Posts.length === 0) {
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
            <img src={emptyState} alt="empty state" className="state-img" />
          </StateMessage>
        </IonCard>
      )
    }

    return (
      Array.isArray(Posts) &&
      Posts.map((item, index) => {
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
          <Thread thread={item} key={index} />
        )
      })
    )
  }
  return <div className="user-thread">{userThreads()}</div>
}

export default index
