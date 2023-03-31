import { MESSAGE_TO_PROFILE, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_SUCCESS_FINALLY } from "../types/messengerType"
import { GET_USER_PROFILE, GET_USER_FRIENDS, GET_USER_MESSAGES } from "./types"

export
 const
    sendMessageTo = (data) => {
      return (dispatch) => {
        dispatch({
          type: MESSAGE_TO_PROFILE,
          payload: data
        })
      }
    },
    messageUpdated = () => (dispatch) => {
      dispatch({ type: MESSAGE_SEND_SUCCESS })
      setTimeout(() => dispatch({ type: MESSAGE_SEND_SUCCESS_FINALLY }), 1000)
    }
