import { useQuery } from "@apollo/client"
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import Thread from "component/thread"
import { getNewsFeed } from "graphql/user"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { USER_SERVICE_GQL } from "servers/types"
import { FeedSkeleton } from "../skeleton/feedSkeleton"

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
  function transformAndStylePostData({ post }) {
    const elevatorInfo = post?.elevatorInfo
    const style = `
      <div style="font-weight: bold; font-size: 18px;">${
        elevatorInfo?.name
      }</div>
      <div style="font-size: 16px;">Type: ${elevatorInfo?.ownType}</div>
      <div style="font-size: 16px;">Location: ${elevatorInfo?.address.city}, ${
      elevatorInfo?.address.stateAbbreviation
    }</div>
      
      <div style="font-size: 16px;">Tags: ${elevatorInfo?.tags?.join(
        ", "
      )}</div>
    `
    const postText = `
      <div style="background-color: #f7f7f7; padding: 10px; border-radius: 5px;">
        ${style}
      </div>
    `

    return {
      ...post,
      postText,
      images: elevatorInfo?.pictures
    }
  }

  // {Posts?.map((item, index) => {
  //     let newData
  //     if (item.section === "university") {
  //       newData = transformAndStylePostData(item)
  //     }
  //     if (item.type === "uni" && item.section === "elevatorInfo") {
  //       return (
  //         <>
  //           <div
  //             style={{
  //               width: "100%",
  //               marginTop: "10px"
  //               // borderTop: "1px solid #e0e0e0"
  //             }}
  //             key={item._id + index}
  //             className="max-md:border-none"
  //           >
  //             <Thread
  //               thread={transformAndStylePostData(item)}
  //               id={item._id}
  //               allProps={allProps}
  //               key={item._id + index}
  //             />
  //           </div>
  //         </>
  //       )
  //     }

  //     if (item.type === "interview") {
  //       return (
  //         <>
  //           <div
  //             style={{
  //               width: "100%",
  //               marginTop: "10px"
  //               // borderTop: "1px solid #e0e0e0"
  //             }}
  //             key={item._id + index}
  //             className="max-md:border-none"
  //           >
  //             <InterviewExperienceCard data={item} />
  //           </div>
  //           {/* <Link key={item._id} to={`/university/${item?.elevatorInfo?.name}`}>
  //               <UniFeed key={index} data={item} />

  //       </Link> */}
  //         </>
  //       )
  //     }

  //     if (item.type === "post") {
  //       return (
  //         <div
  //           style={{
  //             width: "100%",
  //             marginTop: "10px"
  //             // borderTop: "1px solid #e0e0e0"
  //           }}
  //           key={item._id + index}
  //           className="max-md:border-none"
  //         >
  //           <Thread
  //             thread={item}
  //             id={item._id}
  //             allProps={allProps}
  //             key={item._id + index}
  //           />
  //         </div>
  //       )
  //     }

  //     return ""
  //   })}

  const Post = ({ post }) => {
    return (
      <div
        style={{
          width: "100%",
          marginTop: "10px"
          // borderTop: "1px solid #e0e0e0"
        }}
        className="max-md:border-none"
      >
        <Thread
          thread={post}
          id={post._id}
          allProps={allProps}
          key={post._id}
        />
      </div>
    )
  }

  const University = (post) => (
    <div
      style={{
        width: "100%",
        marginTop: "10px"
        // borderTop: "1px solid #e0e0e0"
      }}
      className="max-md:border-none"
    >
      <Thread
        thread={transformAndStylePostData(post)}
        id={post._id}
        allProps={allProps}
        key={post._id}
      />
    </div>
  )

  const SuggestedSpace = ({ data, title, type }) => {
    return (
      <IonCard>
        <IonCardHeader>
          <h4 className="text-lg text-black font-medium">{title}</h4>
        </IonCardHeader>

        <div className="grid grid-cols-2 ">
          {data.map((space) => (
            <div
              key={space._id}
              style={{
                width: "100%",
                marginTop: "10px"
                // borderTop: "1px solid #e0e0e0"
              }}
              className="max-md:border-none  "
            >
              <IonCard>
                <IonCardHeader className="capitalize line-clamp-1">
                  {space.name}
                </IonCardHeader>
                <IonCardContent>
                  <img className="object-cover " src={space.image} alt="" />
                  <p className="pt-3 line-clamp-3">{space.description}</p>
                  <Link to={`/${type}/${space.name}`}>
                    <IonButton
                      type="button"
                      className="mt-4 hover:scale-[1.02] transition-all ease-linear"
                      fill="outline"
                      expand="block"
                    >
                      View
                    </IonButton>
                  </Link>
                </IonCardContent>
              </IonCard>
            </div>
          ))}
        </div>
      </IonCard>
    )
  }

  return (
    <div>
      {Posts?.map((post) => (
        <>
          {post.type === "post" && <Post post={post} key={post._id} />}
          {post.type === "university" && (
            <University post={post} key={post._id} />
          )}
          {post.type === "suggestedSpace" && (
            <SuggestedSpace
              data={post?.suggestedSpace?.spaces}
              post={post}
              title={"Suggested Space"}
              key={post._id}
              type="space"
            />
          )}
          {post.type === "suggestedOrgs" && (
            <SuggestedSpace
              data={post?.suggestedOrgs?.spaces}
              post={post}
              title={"Suggested Orgs"}
              key={post._id}
              type="org"
            />
          )}
        </>
      ))}
      <IonInfiniteScroll threshold="100px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="loading..." />
      </IonInfiniteScroll>
    </div>
  )
}

