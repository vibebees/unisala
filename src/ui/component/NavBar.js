import { useState, useRef, useEffect } from "react"
import {
  IonGrid,
  IonRow,
  IonIcon,
  IonText,
  IonPopover,
  IonBadge
} from "@ionic/react"
import {
  chatbubbles,
  home,
  notifications,
  people,
  personCircle
} from "ionicons/icons"
import { Link } from "react-router-dom"
import SearchBox from "./searchBox"
import ProfilePop from "./profilePop"
import jwtDecode from "jwt-decode"
import { useSelector } from "react-redux"

const Nav = ({ setActiveNavDrop, activeNavDrop }) => {
  const popover = useRef(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const openPopover = (e) => {
      popover.current.event = e
      setPopoverOpen(true)
    },
    unreadMessagesCount = useSelector(
      (state) => state?.userProfile?.unreadMessages?.length
    )

  const navigation = [
    {
      name: "Home",
      icon: home,
      link: "/home"
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
      count: unreadMessagesCount
    },
    {
      name: "Notification",
      icon: notifications,
      link: "/notifications"
    }
  ]
  const [active, setActive] = useState("")
  const {accessToken} = useSelector((state) => state?.auth)
  const decode = accessToken && jwtDecode(accessToken)

  useEffect(() => {
    setActive(window.location.pathname)
  }, [])

  return (
    <IonGrid
      style={{
        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
        padding: "0px",
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        height: "66px"
      }}
    >
      <IonRow
        style={{
          maxWidth: "1280px",
          marginInline: "auto",
          padding: "0.5rem 1rem 0 1rem"
        }}
        className="flex"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px"
          }}
        >
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
              alt="logo"
              style={{
                width: "45px"
              }}
            />
          </Link>
          <div style={{ width: "100%" }}>
            <SearchBox />
          </div>
        </div>
        <IonRow style={{ display: "inline-flex", gap: "2.5rem" }}>
          {decode &&
            navigation.map((item, index) => {
              return (
                <div key={index} style={{ cursor: "pointer" }} className="flex">
                  <Link
                    to={item?.link}
                    onClick={() => setActive(`${item?.link}`)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "3px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IonIcon
                          style={{
                            fontSize: "25px"
                          }}
                          color={active === item.link ? "dark" : "medium"}
                          icon={item.icon}
                        />
                        {item.name === "Messages" && item.count > 0 && (
                          <IonBadge>{item.count}</IonBadge>
                        )}
                      </div>

                      <IonText color={active === index ? "dark" : "medium"}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px"
                          }}
                        >
                          {item.name}
                        </p>
                      </IonText>
                    </div>
                  </Link>
                </div>
              )
            })}

          <div
            onClick={openPopover}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "fit-content",
              gap: "3px",
              cursor: "pointer"
            }}
          >
            <IonIcon
              style={{ fontSize: "25px" }}
              color={active?.includes("@") ? "dark" : "medium"}
              icon={personCircle}
            />

            <IonText color={activeNavDrop.profile ? "dark" : "medium"}>
              <p style={{ margin: 0, fontSize: "14px" }}>My profile</p>
            </IonText>
          </div>
          <IonPopover
            ref={popover}
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
          >
            <ProfilePop
              setPopoverOpen={setPopoverOpen}
              activeNavDrop={activeNavDrop}
              setActiveNavDrop={setActiveNavDrop}
              setActive={setActive}
            />
          </IonPopover>
        </IonRow>
      </IonRow>
    </IonGrid>
  )
}

export default Nav
