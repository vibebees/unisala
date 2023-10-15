import {useState} from "react"
import useDocTitle from "../../../hooks/useDocTitile"
import {screenGreaterThan1000} from "./screens.greater.1000"
import {screensMoreThan768} from "./screens.moreThan768"
import {screenLessThan768} from "./screens.lessThan768"
import unisalaImg from "../../../assets/unisala-intro.png"
import {useParams} from "react-router"
import {personCircle, arrowUpOutline} from "ionicons/icons"

export const getAllProps = ({user = {}, topSpaceData = {}, loggedIn = false, profileData = {}, data = {}, loading = true}) => {

  useDocTitle("Unisala")

  const {getTopActiveSpaces} = topSpaceData || {},
    [showTopScrollbtn, setShowTopScrollbtn] = useState(false),

    [width, setWidth] = useState(window.innerWidth),
    handleResize = () => {
      const {innerWidth} = window
      if (width !== innerWidth) {
        setWidth(innerWidth)
      }
    },
    [activeProfile, setActiveProfile] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    views = {
      greaterThan1000: screenGreaterThan1000({
        title: "Top Spaces",
        topSpaces: getTopActiveSpaces?.spaceCategory
      }),
      greaterThan768: screensMoreThan768({
        activeTab,
        setActiveTab,
        unisalaImg,
        profileData,
        loggedIn
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
    params = useParams(),
    searchSpaceCategory = data?.searchSpaceCategory || {},
    {spaceCategory} = searchSpaceCategory,
    spaceId = spaceCategory?._id,
    parentId = spaceCategory?.parentId // this could be null as the current space could be parent in itself
  let tags = []

  return {
    unisalaImg,
    activeTab,
    setActiveTab,
    createAPostPopUp,
    setCreateAPostPopUp,
    verfiyAPostPopUp,
    setVerifyAPostPopUp,
    width,
    activeProfile,
    setActiveProfile,
    user,
    loggedIn,
    spaceId,
    views,
    handleResize,
    showTopScrollbtn,
    setShowTopScrollbtn,
    profileData,
    params,
    parentId,
    topSpaceData,
    data,
    loading,
    searchSpaceCategory,
    spaceCategory,
    tags
  }

}
