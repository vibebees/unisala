import axios from "axios"
import {
    BEFORE_AUTH_TRACK_PATH, CLEAR_AUTH_ERROR, EMAIL_VERIFICATION_RESENT,
    LOGOUT,
    OAUTH, PASSWORD_RESET_ASK_EMAIL, PASSWORD_RESET_ASK_PASSWORD,
    SHOW_ALERT,
    USER_LOGIN, USER_LOGIN_ERROR,
    USER_REGISTRATION
} from "./types"

export const loginUser = ({ userServer, input, setLoading, present, dismiss, setauth }) => {
    return (dispatch) => axios
    .post(userServer + `/login`, input)
    .then((res) => {
      setLoading(false)
      if (res.data.success) {
        dispatch({
          type: USER_LOGIN,
          payload: res?.data || {}
      })
        window.location.reload()
      }
      if (!res.data.success) {
        present({
          duration: 3000,
          message: res.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        if (res.data.status === 302) {
          setauth({ state: "userNotVerified", email: input.email })
        }
      }
    })
    .catch((err) => {
      setLoading(false)
      present({
        duration: 3000,
        message: err.response.data.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    })
}

export const registerUser = ({ userServer, input, setdatacheck, setauth, setsave, present, dismiss }) => {

    return (dispatch) => axios
        .post(userServer + `/register`, input)
        .then((res) => {
          setsave(false)
          if (res.data.success === true) {
            localStorage.setItem("email", input.email)
            setdatacheck(false)
            setauth({ state: "SignUpVerification" })
            dispatch({
                type: USER_REGISTRATION,
                payload: res
            })
          }
          if (res.data.success === false) {
            present({
              duration: 3000,
              message: res.data.message,
              buttons: [{ text: "X", handler: () => dismiss() }],
              color: "primary",
              mode: "ios"
            })
          }
        })
        .catch((err) => {
          setsave(false)
          present({
            duration: 3000,
            message: err.response.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
          setdatacheck(false)
        })
}

// export const isLoggedIn = (user) => {
//     try {
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//                    mutation{
//                     createUser(userInput:{
//                         username:"${user.username}",
//                         email:"${user.email}",
//                         password:"${user.password}"}){
//                         email
//                         username
//                   }
//                 }`
//         }).then((result) => {
//             dispatch({
//                 type: USER_REGISTRATION,
//                 payload: result.data.data.createUser
//             })
//         })

//     } catch (e) {
//     }
// }

// export const oauth2SaveToken = (data) => {

//     try {
//         return (dispatch) => dispatch({
//             type: OAUTH,
//             payload: data
//         })

//     } catch (e) {
//     }
// }
// export const logout = () => {

//     try {
//         return (dispatch) => dispatch({
//             type: LOGOUT
//         })

//     } catch (e) {
//     }
// }
// export const holdCurrentPath = (path) => {
//     try {
//         return (dispatch) => {
//             dispatch({
//                 type: BEFORE_AUTH_TRACK_PATH,
//                 payload: path
//             })

//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const showAuthAlert = () => {
//     return (dispatch) => {
//         dispatch({
//             type: SHOW_ALERT,
//             payload: true
//         })
//     }
// }
// export const dismissAuthAlert = () => {
//     return (dispatch) => {
//         dispatch({
//             type: SHOW_ALERT,
//             payload: false
//         })
//     }
// }

// export const resendVerificationCode = (token) => {
//     try {
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//             mutation{
//               resendVerification
//              }
//                   `
//         }, {
//             headers: {
//                 Authorization: "Bearer " + token
//             }
//         }).then((result) => {
//             dispatch({
//                 type: EMAIL_VERIFICATION_RESENT,
//                 payload: result.data.data.resendVerification
//             })
//         })

//     } catch (e) {
//     }
// }

// export const verifyEmail = (emailVerificationToken, token) => {
//     try {
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//             mutation{
//              verifyEmail(token:"${emailVerificationToken}")
//              }
//                   `
//         }, {
//             headers: {
//                 Authorization: "Bearer " + token
//             }
//         }).then((result) => {
//             dispatch({
//                 type: EMAIL_VERIFICATION_RESENT,
//                 payload: result.data.data.resendVerification
//             })
//         })

//     } catch (e) {
//     }
// }

// export const resetPasswordAskEmail = (email) => {
//     return (dispatch) => axios.post(`${backendHost}`, {
//         query: `
//              mutation{
//              resetPassword(username:"${email}")
//             }
//               `
//     }).then((result) => {
//         dispatch({
//             type: PASSWORD_RESET_ASK_EMAIL,
//             payload: result.data.data.resetPassword
//         })
//     })
// }

// export const changePasswordFromConfirmationLink = (newCredentials) => {
//     try {
//         const { username, emailSentToken, password } = newCredentials
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//                  mutation{
//                  confirmPasswordReset(
//                      newCredentials:{
//                          username:"${username}"
//                          password:"${password}"
//                          token:"${emailSentToken}"
//                          }
//                  )
//                 }
//                   `
//         }).then((result) => {
//             dispatch({
//                 type: PASSWORD_RESET_ASK_PASSWORD,
//                 payload: result.data.data.confirmPasswordReset
//             })
//         })

//     } catch (e) {
//     }
// }

// export const clearAuthError = () => {
//     return (dispatch) => {
//         dispatch({
//             type: CLEAR_AUTH_ERROR,
//             payload: true
//         })
//     }
// }
