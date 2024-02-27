import { useQuery } from "@apollo/client"
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonText
} from "@ionic/react"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import Thread from "component/thread"
import { getNewsFeed } from "graphql/user"
import { location } from "ionicons/icons"
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

  const University = ({ post }) => {
    const { elevatorInfo } = post
    const formattedAddress = `${elevatorInfo.address.city}, ${elevatorInfo.address.stateAbbreviation}, ${elevatorInfo.address.streetAddressOrPOBox}`
    return (
      <IonCard
        style={{
          width: "100%",
          marginTop: "10px"
          // borderTop: "1px solid #e0e0e0"
        }}
        className="max-md:border-none"
      >
        <IonCardHeader>
          <IonCardTitle>Suggested University</IonCardTitle>
        </IonCardHeader>
        <IonGrid>
          <Link to={`/university/${elevatorInfo.name}`}>
            <IonCardContent>
              <div className="grid grid-cols-4 gap-x-4">
                {elevatorInfo.pictures.slice(0, 4).map((img) => (
                  <ImageWithLoader
                    key={img}
                    className={"object-cover h-48"}
                    src={img}
                  />
                ))}
              </div>
              <div className="mt-4">
                <IonText color="dark">
                  <IonCardTitle>{elevatorInfo.name}</IonCardTitle>
                </IonText>
                <IonRow
                  className="ion-no-padding gap-1 items-center h-fit mt-2"
                  lines="none"
                >
                  <IonIcon
                    className="ion-icon leading-none mt-0 text-primar text-lg"
                    icon={location}
                  />
                  <IonText className="text-sm leading-none m-0 h-fit ion-no-padding font-semibold text-gray-600">
                    {formattedAddress}
                  </IonText>
                </IonRow>
                <IonRow className="mt-4">
                  <IonText className="text-[#55D283] font-semibold">
                    Own Type: {elevatorInfo.ownType}
                  </IonText>
                </IonRow>
                <IonRow className="mt-4 font-semibold">
                  <IonText className="text-blue-600 font-semibold">
                    Tags: {elevatorInfo.tags.join(", ")}
                  </IonText>
                </IonRow>
              </div>
            </IonCardContent>
          </Link>
        </IonGrid>
      </IonCard>
    )
  }

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
        <div className="mt-8" key={post._id}>
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
        </div>
      ))}
      <IonInfiniteScroll threshold="100px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="loading..." />
      </IonInfiniteScroll>
    </div>
  )
}

