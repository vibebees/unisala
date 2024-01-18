import {useRef, useState} from "react"

export const getAllProps = () => {

    let event = {
        imageUrl: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/418947802_122122699298093982_4250882892682419291_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=1vz-5Qp2XYwAX_vv3nU&_nc_ht=scontent-atl3-2.xx&oh=00_AfD4g5nQpU9EMTHo8StSziFa83IaF8LHn-vTLKHr9mNN2A&oe=65ABD8BE",
        date: "Saturday, January 27, 2024",
        title: "Computer Science Webinar with Alumni",
        description: "NSAS Student Association invites you to a webinar with distinguished alumni from our Computer Science department. Get insights into the industry, network with former students, and learn about the opportunities available to you after graduation. Food, games, and prizes await!",
        registered: 10,
        major: "Computer Science"
    }
    const [showAlert, setShowAlert] = useState(false)
    const [selectedYear, setSelectedYear] = useState("")
    const handleRegister = () => {
        setShowAlert(true)
    }

    const [buttonColor, setButtonColor] = useState("primary")

    const handleUserAcitivity = (value) => {
        setSelectedYear(value)
        setButtonText("Registered!")
        setShowAlert(false)
        animation.current?.play()
        setButtonColor("success")

    }
    const [buttonText, setButtonText] = useState("Register Now")
    const buttonEl = useRef(null)
    const animation = useRef(null)

    const year = ["Freshman", "Sophomore", "Junior", "Senior"],
    yearOptions = year.map((year) => ({
        label: year,
        type: "radio",
        value: year
    }))

    const [totalPeopleRegistered, setTotalPeopleRegistered] = useState(10)
    return {
        event,
        showAlert,
        selectedYear,
        handleRegister,
        buttonColor,
        handleUserAcitivity,
        buttonText,
        buttonEl,
        animation,
        year,
        yearOptions,
        setButtonColor,
        setButtonText,
        setShowAlert,
        setSelectedYear,
        totalPeopleRegistered,
        setTotalPeopleRegistered
    }

}
