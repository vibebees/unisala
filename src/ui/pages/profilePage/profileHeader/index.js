// eslint-disable-next-line no-use-before-define
import React from "react"
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
import "./index.css"

const ProfileHeader = ({ tab, setTab, data }) => {
    const {
        firstName,
        lastName,
        username,
        profilePic,
        profileBanner,
        oneLinerBio,
        location: userLocation,
        DOJ,
        socialLinks,
        myProfile
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
        { id: 0, menu: name || username },
        { id: 1, menu: "Threads" },
        { id: 2, menu: "Guestbook" },
        { id: 4, menu: "Saved" }
    ]

    const changeTab = (tabs) => {
        setTab(tabs)
    }

    return (
        <IonCard className="profile-header mb-2">
            <div className="user-banner">
                <div className="user-banner__cover">
                    <img
                        src={
                            profileBanner ??
                            "https://img.freepik.com/premium-photo/back-school-education-banner-background_8087-1192.jpg?w=1380"
                        }
                        className="user-banner__cover--img"
                        alt="userName banner"
                    />
                </div>

                <div className="user-profile">
                    <img
                        src={
                            profilePic ??
                            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1670164432~exp=1670165032~hmac=36b9b40ac0ed5b3a668c8bd6a3773cb706f13b46413881b4a4f1079241cb9eb5"
                        }
                        className="user-profile__img"
                        alt="userName"
                    />
                </div>
                <UserCtaBtns data={data} myProfile={myProfile} />
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
                        {DOJ}
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
                                    <IonIcon
                                        className="black-icon-28"
                                        icon={icons[name]}
                                    />
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
                                className={
                                    id === tab
                                        ? "profile-header__tab-menu--active"
                                        : ""
                                }
                            >
                                <h4 className="profile-header__tab-menu--h4">
                                    {menu}
                                </h4>
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
