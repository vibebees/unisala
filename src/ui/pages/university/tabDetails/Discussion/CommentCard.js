// eslint-disable-next-line no-use-before-define
import React from "react"
import {
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonButtons,
  IonIcon,
  IonPopover,
  IonItem,
  IonList,
  IonLabel
} from "@ionic/react"
import "./Threads.css"
import moment from "moment"
import { ellipsisHorizontal, trashBin } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { SavePost } from "../../../../../graphql/user"

const CommentCard = ({
  commentUser,
  commentDate,
  commentText,
  commentimage,
  postId
}) => {
  const [showPopover, setShowPopover] = React.useState(false)
  const [love, setLove] = React.useState(false)
  const [savePost] = useMutation(SavePost, {
    variables: {
      postId: postId
    },
    onCompleted: (data) => {
      if (data.savePost.status.success) {
        setLove(true)
      }
    }
  })
  return (
    <IonCard
      style={{
        margin: "0px",
        padding: "0px",
        boxShadow: "0px 0px 0px 0px"
      }}
    >
      <IonButtons
        id="card-dot"
        onClick={() => setShowPopover(true)}
        className="card-three-dot"
      >
        <IonIcon icon={ellipsisHorizontal} />
      </IonButtons>
      <IonPopover
        mode="md"
        trigger="card-dot"
        triggerAction="click"
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem
            button
            onClick={() => {
              savePost()
              setShowPopover(false)
            }}
          >
            <IonIcon color={love ? "danger" : "medium"} icon={trashBin} />
            <IonLabel className="ion-text-wrap ion-margin-start">
              dalate
            </IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>

      <IonGrid
        style={{
          margin: "0px 5px",
          padding: "0px"
        }}
      >
        <IonRow
          style={{
            margin: "0px",
            padding: "0px"
          }}
        >
          <IonCol
            style={{
              margin: "0px 5px",
              padding: "0px"
            }}
          >
            <IonRow
              style={{
                alignItems: "center",
                margin: "0px",
                gap: "10px"
              }}
            >
              <div className="thread-avatar">
                <IonAvatar
                  style={{
                    width: "40px",
                    height: "40px"
                  }}
                >
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      background: "cover",
                      overflow: "hidden"
                    }}
                    src={
                      "https://vz.cnwimg.com/thumb-1200x/wp-content/uploads/2010/10/Chris-Evans-e1587513440370.jpg"
                    }
                    alt=""
                  />
                </IonAvatar>
              </div>

              <div
                style={{
                  // display: "flex",
                  alignSelf: "center",
                  gap: "10px",
                  alignItems: "flex-end"
                }}
              >
                <IonText color="dark">
                  <h6
                    style={{
                      margin: "0px"
                    }}
                  >
                    {commentUser}
                  </h6>
                </IonText>
                <IonText>
                  {" "}
                  <p
                    style={{
                      margin: "0px"
                    }}
                  >
                    {moment(commentDate).startOf("hour").fromNow()}
                  </p>
                </IonText>
              </div>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>

      <div
        style={{
          marginLeft: !commentimage && "60px"
        }}
      >
        <IonText color="dark">
          <p
            style={{
              margin: "0px",
              fontSize: "15px"
            }}
          >
            {commentText}
          </p>
        </IonText>
        {commentimage && (
          <div
            style={{
              marginTop: "20px",
              width: "100%"
            }}
          >
            <img
              src={commentimage}
              style={{
                maxHeight: "400px",
                width: "100%",
                objectFit: "cover"
              }}
              alt=""
            />
          </div>
        )}
      </div>
    </IonCard>
  )
}
export default CommentCard
