const { default: useWindowWidth } = require("hooks/useWindowWidth")
const {
  home,
  people,
  chatbubbles,
  notifications,
  navigateCircle
} = require("ionicons/icons")
const { default: jwtDecode } = require("jwt-decode")
const { useRef, useState } = require("react")
const { useSelector, useDispatch } = require("react-redux")

export default function AppProps() {
  const popover = useRef(null),
    [popoverOpen, setPopoverOpen] = useState(false),
    navigation = [
      {
        name: "Home",
        icon: home,
        link: "/home"
      },
      {
        name: "Explore Universities",
        icon: navigateCircle,
        link: "/search?tab=uni"
      },
      {
        name: "My Network",
        icon: people,
        link: "/mynetwork"
      },
      {
        name: "Messages",
        icon: chatbubbles,
        link: "/messages",
        count: 0
      }
      // {
      //     name: "Notification",
      //     icon: notifications,
      //     link: "/notifications"
      // }
    ],
    [active, setActive] = useState(""),
    { refreshToken, accessToken } = useSelector((state) => state?.auth),
    decode = accessToken && jwtDecode(accessToken),
    width = useWindowWidth(),
    [createAPostPopUp, setCreateAPostPopUp] = useState(false),
    [activeNavDrop, setActiveNavDrop] = useState({
      profile: false,
      message: false,
      notification: false
    }),
    dispatch = useDispatch()

  return {
    popover,
    popoverOpen,
    setPopoverOpen,
    navigation,
    active,
    setActive,
    refreshToken,
    accessToken,
    decode,
    width,
    createAPostPopUp,
    setCreateAPostPopUp,
    activeNavDrop,
    setActiveNavDrop,
    dispatch
  }
}
