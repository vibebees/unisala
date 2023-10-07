import { useEffect, useState } from "react"
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { getNewsFeed } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import CourseCard from "../../component/courseCard"
import Thread from "../../component/thread"
import { FeedSkeleton } from "../../component/skeleton/feedSkeleton"
import {UniFeed} from "../../component/uniFeed"

export const InfinteFeed = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)

  const {page, setPage} = allProps
  const { data, loading, fetchMore } = useQuery(getNewsFeed, {
    variables: { userId: user._id, page: 0 },
    context: { server: USER_SERVICE_GQL }
  })

  const Posts = data?.fetchMyNewsFeed

  if (!Posts && loading) {
    return <FeedSkeleton />
  }

  const loadMore = async (e) => {
    setPage((currentPage) => currentPage + 1)
    await fetchMore({
      variables: {
        userId: user._id,
        page: page + 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          fetchMyNewsFeed: [...prev.fetchMyNewsFeed, ...fetchMoreResult.fetchMyNewsFeed]
        }
      }
    })
    e.target.complete()
  }
  function transformAndStylePostData(originalData) {
    const { elevatorInfo } = originalData

    console.log({ originalData })
    // Define the styling using HTML tags and inline styles
    const style = `
      <div style="font-weight: bold; font-size: 18px;">${elevatorInfo?.name}</div>
      <div style="font-size: 16px;">Type: ${elevatorInfo?.ownType}</div>
      <div style="font-size: 16px;">Location: ${elevatorInfo?.address.city}, ${elevatorInfo?.address.stateAbbreviation}</div>
      <div style="font-size: 16px;">Majors: ${elevatorInfo?.majors?.map((major) => major.title).join(", ")}</div>
      <div style="font-size: 16px;">Tags: ${elevatorInfo?.tags?.join(", ")}</div>
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
  console.log(transformedData)

return (
    <div>
    {Posts?.map((item, index) => {
      let newData
       if (item.section === "elevatorInfo") {
        newData = transformAndStylePostData(item)
       }
      console.log(item.name)
      if (item.type === "uni" && item.section === "elevatorInfo") {
        return (

          <>

            {/* <div
            style={{width: "100%", marginTop: "10px", borderTop: "1px solid #e0e0e0"}}
            key={item._id + index}
          >
            <Thread thread={transformAndStylePostData(item)} id={item._id} allProps={allProps} key={item._id + index} />
          </div> */}
          <Link key={item._id} to={`/university/${item?.elevatorInfo?.name}`}>
                  <UniFeed key={index} data={item} />

          </Link>
          </>
        )
      }

      if (item.type === "post") {
        return (
          <div
            style={{width: "100%", marginTop: "10px", borderTop: "1px solid #e0e0e0"}}
            key={item._id + index}
          >
            <Thread thread={item} id={item._id} allProps={allProps} key={item._id + index} />
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
