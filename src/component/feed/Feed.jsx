import { useQuery } from "@apollo/client"
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react"
import { getNewsFeed } from "graphql/user"
import { useState } from "react"
import { useSelector } from "react-redux"
import { USER_SERVICE_GQL } from "servers/types"
import { InterviewExperienceCard } from "../interviewExperienceCard"
import { FeedSkeleton } from "../skeleton/feedSkeleton"
import Thread from "../thread"

export const InfiniteFeed = ({ allProps, feedType, feedId }) => {
  const { user } = useSelector((state) => state.userProfile)

  const [page, setPage] = useState(0)
  const { data, loading, fetchMore } = useQuery(getNewsFeed, {
    variables: {
      feedQuery: {
        feedType,
        feedId,
        page: 0
      }
    },
    context: { server: USER_SERVICE_GQL }
  })

  const Posts = data?.fetchFeedV2?.data

  if (!Posts && loading) {
    return <FeedSkeleton />
  }

  const loadMore = (e) => {
    setPage((prev) => prev + 1)
    fetchMore({
      variables: {
        feedQuery: {
          page: page + 1,
          feedId,
          feedType
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          fetchFeedV2: {
            ...prev.fetchFeedV2,
            data: [
              ...prev.fetchFeedV2.data,
              ...fetchMoreResult.fetchFeedV2.data
            ]
          }
        }
      }
    })
    setTimeout(() => {
      e.target.complete()
    }, 500)
  }
  function transformAndStylePostData(originalData) {
    const { elevatorInfo } = originalData

    // Define the styling using HTML tags and inline styles
    const style = `
      <div style="font-weight: bold; font-size: 18px;">${
        elevatorInfo?.name
      }</div>
      <div style="font-size: 16px;">Type: ${elevatorInfo?.ownType}</div>
      <div style="font-size: 16px;">Location: ${elevatorInfo?.address.city}, ${
      elevatorInfo?.address.stateAbbreviation
    }</div>
      <div style="font-size: 16px;">Majors: ${elevatorInfo?.majors
        ?.map((major) => major.title)
        .join(", ")}</div>
      <div style="font-size: 16px;">Tags: ${elevatorInfo?.tags?.join(
        ", "
      )}</div>
    `

    // Combine the styling with the postText
    const postText = `
      <div style="background-color: #f7f7f7; padding: 10px; border-radius: 5px;">
        ${style}
      </div>
    `

    return {
      ...originalData,
      postText,
      images: elevatorInfo?.pictures
    }
  }

  // Example usage:
  const originalData = {
    // ...your original data structure
  }

  const transformedData = transformAndStylePostData(originalData)

  return (
    <div>
      {Posts?.map((item, index) => {
        let newData
        if (item.section === "elevatorInfo") {
          newData = transformAndStylePostData(item)
        }
        if (item.type === "uni" && item.section === "elevatorInfo") {
          return (
            <>
              <div
                style={{
                  width: "100%",
                  marginTop: "10px"
                  // borderTop: "1px solid #e0e0e0"
                }}
                key={item._id + index}
                className="max-md:border-none"
              >
                <Thread
                  thread={transformAndStylePostData(item)}
                  id={item._id}
                  allProps={allProps}
                  key={item._id + index}
                />
              </div>
              {/* <Link key={item._id} to={`/university/${item?.elevatorInfo?.name}`}>
                  <UniFeed key={index} data={item} />

          </Link> */}
            </>
          )
        }

        if (item.type === "interview") {
          return (
            <>
              <div
                style={{
                  width: "100%",
                  marginTop: "10px"
                  // borderTop: "1px solid #e0e0e0"
                }}
                key={item._id + index}
                className="max-md:border-none"
              >
                <InterviewExperienceCard data={item} />
              </div>
              {/* <Link key={item._id} to={`/university/${item?.elevatorInfo?.name}`}>
                  <UniFeed key={index} data={item} />

          </Link> */}
            </>
          )
        }

        if (item.type === "post") {
          return (
            <div
              style={{
                width: "100%",
                marginTop: "10px"
                // borderTop: "1px solid #e0e0e0"
              }}
              key={item._id + index}
              className="max-md:border-none"
            >
              <Thread
                thread={item}
                id={item._id}
                allProps={allProps}
                key={item._id + index}
              />
            </div>
          )
        }

        return ""
      })}

      <IonInfiniteScroll threshold="100px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="loading..." />
      </IonInfiniteScroll>
    </div>
  )
}

