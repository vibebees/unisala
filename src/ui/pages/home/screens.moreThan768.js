import {
  IonCol,
  IonCard,
  IonText,
  IonAvatar,
  IonItem,
  IonLabel
} from "@ionic/react"
import { useSelector } from "react-redux"
import { Avatar } from "../../component/Avatar"
import BadgesTab from "./BadgeTab"
import { imageAccess } from "../../../servers/endpoints"
import { useEffect, useState } from "react"
import { getImage } from "../../../servers/s3.configs"
import { useLocation } from "react-router"
import TopSpaces from "../../component/TopSpaces/TopSpaces"
export const screensMoreThan768 = ({
  activeTab,
  setActiveTab,
  unisalaImg,
  profileData,
  loggedIn,
  topSpaces
}) => {
  const { user } = useSelector((state) => state.userProfile)
  const [percentage, setPercentage] = useState(30)

  const radius = 45
  const dashArray = radius * Math.PI * 2
  const dataOffset = dashArray - (dashArray * percentage) / 100
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
          <IonCard>
            <div className="aside-profile">
              <div className="w-24 h-24 rounded-full overflow-hidden   !border-[7px] !border-neutral-200">
                <Avatar
                  username={user.username}
                  profilePic={user?.picture}
                  size="medium"
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
                className="progress-ring"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#e91e63" />
                    <stop offset="100%" stopColor="#673ab7" />
                  </linearGradient>
                </defs>
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  strokeLinecap="round"
                  style={{
                    fill: "none",
                    stroke: "url(#GradientColor)",
                    strokeWidth: "7px",
                    strokeDasharray: dashArray,
                    strokeDashoffset: dataOffset
                  }}
                />
              </svg>
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
