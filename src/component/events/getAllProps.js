import {useEffect, useRef, useState} from "react"

export const getAllProps = () => {

    const [event, setEvent] = useState({
        imageUrl: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/418947802_122122699298093982_4250882892682419291_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=1vz-5Qp2XYwAX_vv3nU&_nc_ht=scontent-atl3-2.xx&oh=00_AfD4g5nQpU9EMTHo8StSziFa83IaF8LHn-vTLKHr9mNN2A&oe=65ABD8BE",
        date: "Saturday, January 27, 2024",
        title: "Computer Science Webinar with Alumni",
        description: "NSAS Student Association invites you to a webinar with distinguished alumni from our Computer Science department. Get insights into the industry, network with former students, and learn about the opportunities available to you after graduation. Food, games, and prizes await!",
        registered: 10,
        major: "Computer Science",
        dayRemaining: 7
    })
    const [showAlert, setShowAlert] = useState(false)
    const [selectedYear, setSelectedYear] = useState("")
    const handleRegister = () => {
        setShowAlert(true)
    }
    const [buttonState, setButtonState] = useState({
        text: "Register Now",
        state: "notRegistered"
    })
    const [buttonColor, setButtonColor] = useState("primary")

    const eventHandler = {
        notRegistered: () => {
            setButtonState({
                text: "Register Now",
                state: "notRegistered"
            })
            setEvent((prev) => ({...prev, registered: prev.registered - 1}))
            setButtonColor("primary")
        },
        registered: () => {
            setButtonState({
                text: "Registered",
                state: "registered"
            })
            animation.current?.play()
            setEvent((prev) => ({...prev, registered: prev.registered + 1}))
            setButtonColor("success")
        }
    }
    const handleUserAcitivity = (value) => {
        setSelectedYear(value)
        setShowAlert(false)
        if (buttonState.state === "notRegistered") {
            eventHandler.registered()
        } else {
            eventHandler.notRegistered()
        }
    }

    const buttonEl = useRef(null)
    const animation = useRef(null)

    const year = ["Freshman", "Sophomore", "Junior", "Senior"],
        yearOptions = {
            header: "Select your year in college",
            body: year.map((year, index) => {
                return {
                    label: year,
                    type: "radio",
                    value: year
                }
            })
        },
        optOutOptions = {
            header: "Are you intrested in this event?",
            body: [
                {
                    label: "Not Intrested",
                    type: "radio",
                    value: "notIntrested"
                },
                {
                    label: "🍿",
                    type: "radio",
                    value: "watching"
                }
            ]
        },
        activityOptions = {
            notRegistered: yearOptions,
            registered: optOutOptions
        },
        [currentOptions, setCurrentOptions] = useState(activityOptions[buttonState.state]),
        clickOptions = [
            {
                text: "Cancel",
                role: "cancel",
                handler: () => {
                    setShowAlert(false)
                }
            },
            {
                text: "OK",
                role: "confirm",
                handler: (value) => handleUserAcitivity(value)
            }
        ]

        useEffect(() => {
            setCurrentOptions(activityOptions[buttonState.state])
        }, [buttonState.state])

    const [totalPeopleRegistered, setTotalPeopleRegistered] = useState(10)
    return {
        event,
        showAlert,
        selectedYear,
        handleRegister,
        buttonColor,
        handleUserAcitivity,
        buttonEl,
        animation,
        year,
        yearOptions,
        setButtonColor,
        buttonState,
        setButtonState,
        setShowAlert,
        setSelectedYear,
        totalPeopleRegistered,
        setTotalPeopleRegistered,
        activityOptions,
        clickOptions,
        currentOptions,
        setCurrentOptions
    }

}
