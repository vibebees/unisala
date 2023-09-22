import {useState} from "react"
import unisalaImg from "../../../assets/unisala-intro.png"
import {screenGreaterThan1000, screenLessThan768, screensMoreThan768} from "./helper.func"
import useWindowWidth from "../../../hooks/useWindowWidth"
import {GetTopActiveSpaces} from "../../../graphql/user"
import { personCircle } from "ionicons/icons"

export const getAllPropsHome = ({user, loggedIn}) => {
  const [activeProfile, setActiveProfile] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    [newUser, setNewUser] = useState(localStorage.getItem("newUser") || false),
    views = {
      greaterThan1000: screenGreaterThan1000(),
      greaterThan768: screensMoreThan768({
        activeTab,
        setActiveTab,
        unisalaImg,
        loggedIn,
        topSpaces: GetTopActiveSpaces?.spaceCategory
      }),
      lessThan768: screenLessThan768({
        setActiveProfile,
        personCircle,
        activeProfile,
        loggedIn,
        username: user.username
      })
    },
    [createAPostPopUp, setCreateAPostPopUp] = useState(false),
    [verfiyAPostPopUp, setVerifyAPostPopUp] = useState(false),
    [page, setPage] = useState(0),
    width = useWindowWidth()

  return {
    unisalaImg,
    activeTab,
    setActiveTab,
    createAPostPopUp,
    setCreateAPostPopUp,
    verfiyAPostPopUp,
    setVerifyAPostPopUp,
    width,
    newUser,
    setNewUser,
    activeProfile,
    setActiveProfile,
    user,
    loggedIn,
    GetTopActiveSpaces,
    views,
    page,
    setPage
  }
}
