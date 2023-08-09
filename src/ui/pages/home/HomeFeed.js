import CourseCard from "../../component/courseCard"
import Thread from "../../component/thread"
import {Link} from "react-router-dom"
import {useQuery} from "@apollo/client"
import {getNewsFeed} from "../../../graphql/user"
import {useSelector} from "react-redux"
import {USER_SERVICE_GQL} from "../../../servers/types"

const HomeFeed = ({userInfo}) => {
  const {user} = useSelector((store) => store?.userProfile)
  const {data, loading, error} = useQuery(getNewsFeed, {
    context: {server: USER_SERVICE_GQL},
    variables: {userId: user._id}
  })

  return (
    <>
      <div style={{margin: "10px 0px 0px 0px"}}>
        {Array.isArray(data?.fetchMyNewsFeed) &&
          data?.fetchMyNewsFeed.map((post, index) => {
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
                <Thread thread={post} id={post?._id} />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default HomeFeed
