import propTypes from "prop-types"
import { Link } from "react-router-dom"
import { IonCard, IonCardSubtitle, IonText, IonIcon } from "@ionic/react"
import {
  location,
  calendar,
  logoGithub,
  logoTwitch,
  logoFacebook,
  logoYoutube,
  logoTwitter,
  logoInstagram,
  logoLinkedin
} from "ionicons/icons"
import UserCtaBtns from "./userCtaBtns/UserCtaBtns"
import { Avatar } from "../../../component/Avatar"
import "./index.css"
import { useEffect, useState } from "react"
import { getImage } from "../../../../servers/s3.configs"

const ProfileHeader = ({ tab, setTab, data }) => {
  const [coverImage, setCoverImage] = useState("")
  const {
    firstName,
    lastName,
    username,
    profilePic,
    coverPicture,
    oneLinerBio,
    location: userLocation,
    doj,
    socialLinks
  } = data

  const icons = {
    twitter: logoTwitter,
    github: logoGithub,
    facebook: logoFacebook,
    youtube: logoYoutube,
    twitch: logoTwitch,
    instagram: logoInstagram,
    linkedin: logoLinkedin
  }

  const tabMenu = [
    { id: 0, menu: username },
    { id: 1, menu: "Threads" },
    { id: 2, menu: "Guestbook" },
    { id: 4, menu: "Saved" }
  ]

  const changeTab = (tabs) => {
    setTab(tabs)
  }

  useEffect(() => {
    getImage("user", coverPicture, setCoverImage)
  }, [coverPicture])

  return (
    <IonCard className="profile-header mb-2">
      <div className="user-banner">
        <div className="user-banner__cover">
          <img
            src={
              coverImage ||
              "https://img.freepik.com/premium-photo/back-school-education-banner-background_8087-1192.jpg?w=1380"
            }
            className="user-banner__cover--img"
            alt="userName banner"
          />
        </div>

        <div className="user-profile">
          <Avatar profilePic={profilePic} username={username} />
        </div>
        <UserCtaBtns profileHeader={data} myProfile={data.myProfile} />
      </div>

      <div className="short-info-wrapper">
        <IonText color="dark">
          <h1>{firstName + " " + lastName}</h1>
          <IonCardSubtitle>@{username}</IonCardSubtitle>
        </IonText>

        <div className="inline-2 flex-wrap">
          {userLocation && (
            <IonCardSubtitle className="icon-text">
              <IonIcon className="icon-16" icon={location} />
              {userLocation}
            </IonCardSubtitle>
          )}
          <IonCardSubtitle className="icon-text">
            <IonIcon className="icon-16" icon={calendar} />
            joined {doj.split("T")[0].split("-").join("/")}
          </IonCardSubtitle>
        </div>
        <IonText>
          <p>{oneLinerBio}</p>
        </IonText>
        <div className="inline-1">
          {Array.isArray(socialLinks) &&
            socialLinks.map((social, i) => {
              const { name, url } = social
              return (
                <Link to={url} key={i}>
                  <IonIcon className="black-icon-28" icon={icons[name]} />
                </Link>
              )
            })}
        </div>

        <ul className="inline-2 profile-header__tab-menu">
          {tabMenu.map((tabItem) => {
            const { id, menu } = tabItem
            return (
              <li
                key={id}
                onClick={() => {
                  changeTab(id)
                }}
                className={id === tab ? "profile-header__tab-menu--active" : ""}
              >
                <h4 className="profile-header__tab-menu--h4">{menu}</h4>
              </li>
            )
          })}
        </ul>
      </div>
    </IonCard>
  )
}

ProfileHeader.propTypes = {
  setTab: propTypes.func.isRequired,
  tab: propTypes.number.isRequired,
  data: propTypes.object.isRequired
}

export default ProfileHeader
