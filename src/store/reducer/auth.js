import {UNI_SERV_SIGNED_URL, USER_SERV_SIGNED_URL} from "../types/userActivity"

export let initial = {
    refreshToken: null,
    accessToken: null,
    uniSeviceSignedUrl: null,
    userSeviceSignedUrl: null
}
// const auth = (state = initial, action) => {
//     switch (action.type) {
//         case "USER_LOGIN":
//             return state
//         default:
//             return state
//     }
// }
// export default auth

const authentication = (state = initial, action) => {
    const {type, payload} = action

    switch (type) {
        case "USER_REGISTRATION":
            return state

        case "USER_LOGIN":
            state = {
                ...state,
                refreshToken: payload.refreshToken,
                accessToken: payload.accessToken,
                message: payload.message,
                firstName: payload.firstName,
                lastName: payload.lastName,
                username: payload.username,
                id: payload.id

            }

            localStorage.setItem("accessToken", state.accessToken)
            localStorage.setItem("refreshToken", state.refreshToken)

            return state
        case "OAUTH":
            localStorage.setItem("username", payload.username)
            localStorage.setItem("token", payload.token)
            state = {
                ...state,
                userId: payload.userId,
                token: payload.token,
                username: payload.username
            }
            return state
        case "LOGOUT":
            localStorage.removeItem("username")
            localStorage.removeItem("token")
            state = {
                ...state,
                beforeAuthPath: null,
                username: null,
                isAuth: null,
                redirect: false,
                registrationRedirect: false,
                loginError: null,
                token: null,
                userId: null,
                tokenExpiration: null,
                loginRedirect: false,
                showAuthAlert: false
            }
            return state
        case "BEFORE_AUTH_TRACK_PATH":
            if (action.typeofpayload === "string") {
                state = {
                    ...state,
                    beforeAuthPath: payload
                }
            }
            return state
        case "SHOW_ALERT":
            state = {
                ...state,
                showAuthAlert: payload
            }
            return state
        case "EMAIL_VERIFICATION_RESENT":
            if (action.payload) {
                state = {
                    ...state,
                    emailVerificationSent: true
                }
            }
            return state
        case "PASSWORD_RESET_ASK_EMAIL":
            if (action.payload) {
                state = {
                    ...state,
                    resetPasswordEmailAsked: true
                }
            }
            return state
        case "PASSWORD_RESET_ASK_PASSWORD":
            if (action.payload) {
                state = {
                    ...state,
                    passwordResetCompleted: true
                }
            }
            return state
        case "USER_LOGIN_ERROR":
            state = {
                ...state,
                loginFailed: true
            }
            return state
        case "CLEAR_AUTH_ERROR":
            state = {
                ...state,
                loginFailed: false
            }
            return state

        case UNI_SERV_SIGNED_URL:
            console.log("00000000", payload?.url)
            state = {
                ...state,
                uniSeviceSignedUrl: payload?.url
            }
            return state
        case USER_SERV_SIGNED_URL:
            return {
                ...state,
                userSeviceSignedUrl: payload?.url
            }
        default:
            return state

    }
}
export default authentication
