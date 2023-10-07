import { useState } from "react"
import unisalaImg from "../../../assets/unisala-intro.png"
import {
  screenGreaterThan1000,
  screenLessThan768,
  screensMoreThan768
} from "./helper.func"
import useWindowWidth from "../../../hooks/useWindowWidth"
import { GetTopActiveSpaces } from "../../../graphql/user"
import { personCircle } from "ionicons/icons"
import { useQuery } from "@apollo/client"
import { USER_SERVICE_GQL } from "../../../servers/types"
import {useHistory, useLocation} from "react-router"

export const getAllPropsHome = ({ user, loggedIn, userInfo}) => {
  const [activeProfile, setActiveProfile] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    [newUser, setNewUser] = useState(localStorage.getItem("newUser") || false),
    { data: topSpaceData } = useQuery(GetTopActiveSpaces, {
      variables: { limit: 4 },
      context: { server: USER_SERVICE_GQL }
    }),
    { getTopActiveSpaces } = topSpaceData || {},
    views = {
      greaterThan1000: screenGreaterThan1000(),
      greaterThan768: screensMoreThan768({
        activeTab,
        setActiveTab,
        unisalaImg,
        loggedIn,
        topSpaces: getTopActiveSpaces?.spaceCategory
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
    width = useWindowWidth(),
    history = useHistory(),
    location = useLocation()

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
    setPage,
    history,
    location,
    userInfo
  }
}
