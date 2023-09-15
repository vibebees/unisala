import {
  IonCol,
  IonCard,
  IonText,
  IonAvatar,
  IonItem,
  IonLabel,
  IonButton
} from "@ionic/react"
import { useSelector } from "react-redux"
import { Avatar } from "../../component/Avatar"
import BadgesTab from "./BadgeTab"
import { imageAccess } from "../../../servers/endpoints"
import { useEffect, useState } from "react"
import { getImage } from "../../../servers/s3.configs"
import { useLocation } from "react-router"
import TopSpaces from "../../component/TopSpaces/TopSpaces"
import { Link } from "react-router-dom"
export const screensMoreThan768 = ({
  activeTab,
  setActiveTab,
  unisalaImg,
  profileData,
  loggedIn,
  topSpaces
}) => {
  const { user } = useSelector((state) => state.userProfile)
  const location = useLocation()

  return (
    <IonCol
      size="auto"
      style={{
        height: "100%",
        position: "sticky",
        top: "15px",
        overflow: "auto"
      }}
    >
      {loggedIn ? (
        <>
          <IonCard className="">
            <div className="aside-profile">
              <div className="user-profile-circle">
                <Avatar
                  username={user.username}
                  profilePic={user?.picture}
                  size="medium"
                />
              </div>
            </div>
            <div className="aside-profile-details">
              <IonText className="flex justify-content-center" color="dark">
                <h6>{user?.firstName + " " + user?.lastName}</h6>
              </IonText>
              <IonText color="medium">
                <p>@{user.username}</p>
              </IonText>
            </div>
          </IonCard>

          <IonCol>
            <IonCard className="">
              <IonText color="dark">
                <h6 className="text-center my-2 font-semibold">Top Spaces</h6>
              </IonText>

              <TopSpaces topSpaces={topSpaces} />
              <Link to="/space" style={{ marginTop: "120px" }}>
                <IonText
                  className="max-w-[250px] text-[#3880FF] text-center  font-semibold"
                  fill="solid"
                  style={{
                    "--background": "white",
                    "--background-hover": "#eee"
                  }}
                >
                  <h1 className="py-4">Browse More Spaces</h1>
                </IonText>
              </Link>
            </IonCard>
          </IonCol>
        </>
      ) : (
        <IonCard
          style={{
            maxWidth: "250px"
          }}
        >
          <img src={unisalaImg} alt="unisala" />
          <h5
            className="black-text"
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              lineHeight: "26px",
              padding: "5px"
            }}
          >
            If studying abroad is your dream, making it simple is ours! ✅
          </h5>
        </IonCard>
      )}
    </IonCol>
  )
}
