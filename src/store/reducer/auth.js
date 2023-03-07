
export let initial = {
    message: "",
    refreshToken: null,
    accessToken: null,
    firstName: "",
    lastName: "",
    username: "",
    id: ""
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
    switch (action.type) {
        case "USER_REGISTRATION":
            return state

        case "USER_LOGIN":
            state = {
                ...state,
                refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken,
                message: action.payload.message,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username,
                id: action.payload.id

            }

            localStorage.setItem("accessToken", state.accessToken)
            localStorage.setItem("refreshToken", state.refreshToken)

            return state
        case "OAUTH":
            localStorage.setItem("username", action.payload.username)
            localStorage.setItem("token", action.payload.token)
            state = {
                ...state,
                userId: action.payload.userId,
                token: action.payload.token,
                username: action.payload.username
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
            if (typeof action.payload === "string") {
                state = {
                    ...state,
                    beforeAuthPath: action.payload
                }
            }
            return state
        case "SHOW_ALERT":
            state = {
                ...state,
                showAuthAlert: action.payload
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
        default:
            return state

    }
}
export default authentication
