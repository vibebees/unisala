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
import { useLazyQuery } from "@apollo/client"
import { GetUserPost } from "../../../graphql/user"
import { userServer } from "../../../servers/endpoints"
import axios from "axios"
export const SpaceFeed = ({ userInfo }) => {
  const [postList, setPostList] = useState([])
  const [page, setPage] = useState(0)

  const spaceFeed = [
    {
      type: "uni",
      post: {
        name: "Ligma University",
        location: "Hammond, LA",
        reviews: {
          total: 67,
          rating: 4.96
        },
        averageRating: "A",
        acceptanceRate: 90,
        actRange: {
          min: 19,
          max: 24
        }
      }
    },
    {
      type: "uni",
      post: {
        name: "Southeastern University",
        location: "Hammond, LA",
        reviews: {
          total: 67,
          rating: 4.96
        },
        averageRating: "A",
        acceptanceRate: 90,
        actRange: {
          min: 19,
          max: 24
        }
      }
    },
    {
      type: "post",
      post: {
        _id: "1",
        postText: "It's the month of December! New month, new spirit! 💪",
        postImage:
          "https://s3.amazonaws.com/thumbnails.venngage.com/template/cc5f21fb-5090-4d3e-92c9-143b815b2d6c.png",
        date: "2022-11-20T06:04:32.843Z",
        upVoteCount: 12,
        postCommentsCount: 0,
        upVoted: false,
        saved: false,

        user: {
          userId: "6367b4a441301a00a7d93b15",
          firstName: "Giga",
          lastName: "Chadman",
          username: "gigachadman",
          picture:
            "https://image.shutterstock.com/image-photo/stock-photo-portrait-of-smiling-red-haired-millennial-man-looking-at-camera-sitting-in-caf-or-coffeeshop-250nw-1194497251.jpg"
        }
      }
    },
    {
      type: "post",
      post: {
        _id: "2",
        postText: "yoo less goo! 🏃‍♀️💨",
        postImage:
          "https://img.itch.zone/aW1nLzkzMzY1NjMucG5n/315x250%23c/Gb%2BH2t.png",
        date: "2022-11-20T06:04:32.843Z",
        upVoteCount: 12,
        postCommentsCount: 0,
        upVoted: false,
        saved: false,

        user: {
          userId: "6367b4a441301a00a7d93b15",
          firstName: "Giga",
          lastName: "Chadman",
          username: "gigachadman"
        }
      }
    }
  ]

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
        {Array.isArray(spaceFeed) &&
          spaceFeed.map((item, index) => {
            const { post } = item
            return item.type === "uni" ? (
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
