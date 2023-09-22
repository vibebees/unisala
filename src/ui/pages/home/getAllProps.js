import {useState} from "react"

function getAllProps() {
    const [activeProfile, setActiveProfile] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    [newUser, setNewUser] = useState(localStorage.getItem("newUser") || false),
    views = {
      greaterThan1000: screenGreaterThan1000(),
      greaterThan768: screensMoreThan768({
        activeTab,
        setActiveTab,
        unisalaImg,
        profileData,
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
    width = useWindowWidth()
}
