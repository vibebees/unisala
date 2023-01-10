// eslint-disable-next-line no-use-before-define
import React, { useRef, useState } from "react"
import "./auth.css"
import { useScript } from "../../../hooks/useScript"
import axios from "axios"
import urls from "../../../utils/urls"

export const GoogleAuth = () => {
    const googlebuttonref = useRef()
    const [user, setuser] = useState(false)
    const onGoogleSignIn = (user) => {
        let userCred = user
        console.log(userCred)
        axios.post(urls["base"] + "/googleLogin", userCred).then((res) => {
            console.log(res)
        })
    }
    useScript("https://accounts.google.com/gsi/client", () => {
        window.google.accounts.id.initialize({
            client_id:
                "495426079334-c0l6u5292ur5q0shvv7cq3dp4rl7d5pc.apps.googleusercontent.com", // here's your Google ID
            callback: onGoogleSignIn,
            auto_select: false
        })

        window.google.accounts.id.renderButton(googlebuttonref.current, {
            size: "large",
            shape: "circle",
            theme: "outline"
        })
    })

    return <div ref={googlebuttonref} />
}
export default GoogleAuth
