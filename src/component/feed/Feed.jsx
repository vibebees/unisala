import { useQuery } from "@apollo/client"
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonText
} from "@ionic/react"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import Thread from "component/thread"
import { getNewsFeed } from "graphql/user"
import { location, schoolOutline } from "ionicons/icons"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { USER_SERVICE_GQL } from "servers/types"
import { FeedSkeleton } from "../skeleton/feedSkeleton"
import {defaultUniImages} from "./default.images"
import index from "component/tabs"

const Post = ({ post, allProps, feedType, feedId}) => {
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
        feedType={feedType}
        feedId={feedId}
        key={post?._id || post}
      />
    </div>
  )
}

const University = ({ post }) => {
  const { elevatorInfo, studentCharges } = post
  const formattedAddress = `${elevatorInfo.address.city}, ${elevatorInfo.address.stateAbbreviation}, ${elevatorInfo.address.streetAddressOrPOBox}`
  return (
    <IonCard className="mt-2.5 shadow-lg max-w-md mx-auto">

      <IonGrid>
        <Link to={`/university/${elevatorInfo.name}`} className="no-underline">
          <IonCardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
              {elevatorInfo?.pictures.slice(0, 4).map((img) => {
                const randomImage = defaultUniImages[Math.floor(Math.random() * defaultUniImages.length)]
                  if (img === "") {
                    return <ImageWithLoader key={index} src= {randomImage} alt="university" />
                  } else {
                    return <ImageWithLoader key={index} src={img} alt="university" />
                  }
              })}
            </div>
            <div className="mt-4 px-4">
              <IonHeader color="dark">
                <h2 className="text-2xl font-bold text-gray-800">{elevatorInfo.name}</h2>
              </IonHeader>
              <IonRow>
                <IonCol>
              <IonIcon icon={location} className="text-primary mr-2" />

                </IonCol>

                <IonCol>
                {formattedAddress}
                </IonCol>
              </IonRow>
              <p className="font-semibold text-gray-600"></p>
              <div className="mt-4">
                <p className="text-primary font-semibold">Own Type: {elevatorInfo.ownType}</p>
              </div>
              <div className="mt-2">
                <p className="text-blue-600 font-semibold">Tags: {elevatorInfo?.tags?.join(", ")}</p>
              </div>
              <div className="flex flex-wrap justify-between items-center mt-4">
                <p className="text-red-600 font-semibold">Graduate Application Fee: ${studentCharges?.graduateApplicationFee ?? "N/A"}</p>
                <p className="text-blue-600 font-semibold">Undergraduate Application Fee: ${studentCharges?.undergraduateApplicationFee ?? "N/A"} 📚</p>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="font-semibold text-green-600">Graduate In-State Tuition: ${studentCharges?.graduate?.inState?.tuition ?? "N/A"}</p>
                <p className="font-semibold text-green-600">Graduate Out-State Tuition: ${studentCharges?.graduate?.outOfState?.tuition ?? "N/A"}</p>
                <p className="font-semibold text-yellow-500">Undergraduate In-State Tuition: ${studentCharges?.undergraduate?.inState?.tuition ?? "N/A"}</p>
                <p className="font-semibold text-yellow-500">Undergraduate Out-State Tuition: ${studentCharges?.undergraduate?.outOfState?.tuition ?? "N/A"}</p>
              </div>
            </div>
          </IonCardContent>
        </Link>
      </IonGrid>
    </IonCard>
  )
}

const SuggestedSpace = ({ data, title, type }) => {
  return (
    <IonCard className="ion-no-margin">
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
            <IonCard className="border h-full">
              <IonCardHeader className="capitalize line-clamp-1">
                {space.name}
              </IonCardHeader>
              <IonCardContent>
                <div>
                  <img className="object-cover " src={space.image} alt="" />
                </div>

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


export const InfiniteFeed = ({ allProps, feedType, feedId }) => {
  const { user } = useSelector((state) => state.userProfile)

  const [page, setPage] = useState(0)
  const { data, loading, fetchMore } = useQuery(getNewsFeed, {
    variables: {
      feedQuery: {
        feedType,
        feedId,
        pageSize: 2,
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
          pageSize: 2,
          feedId,
          feedType
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          fetchFeedV2: {
            ...prev?.fetchFeedV2,
            data: [
              ...(prev?.fetchFeedV2?.data || []),
              ...(fetchMoreResult?.fetchFeedV2?.data || [])
            ]
          }
        }
    }
    })
    setTimeout(() => {
      e.target.complete()
    }, 1000)
  }

  return (
    <div>
      {Posts?.map((post, index) => {
        const keyBase = `post-${index}`
        return (
          <div className="mt-5" key={post._id || keyBase}>
            {post.type === "post" && <Post post={post} index={index} allProps ={ allProps} feedType ={feedType} feedId={feedId}/>}
            {post.type === "university" && (
              <University post={post} key={`university-${keyBase}`} />
            )}
            {post.type === "suggestedSpace" && (
              <SuggestedSpace
                data={post?.suggestedSpace?.spaces}
                post={post}
                title={"Suggested Space"}
                key={`suggestedSpace-${keyBase}`}
                type="space"
              />
            )}
            {post.type === "suggestedOrgs" && (
              <SuggestedSpace
                data={post?.suggestedOrgs?.spaces}
                post={post}
                title={"Suggested Orgs"}
                key={`suggestedOrgs-${keyBase}`}
                type="org"
              />
            )}
          </div>
        )
      })}
      <IonInfiniteScroll threshold="50px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="Loading more posts..." />
      </IonInfiniteScroll>
    </div>
  )

}

