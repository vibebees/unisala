import { MESSAGE_TO_PROFILE, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_SUCCESS_FINALLY, SEEN_MESSAGE, REMOVE_SEEN_MESSAGE } from "../types/messengerType"
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
    },
    addSeenEye = (seenBy) => (dispatch) => {
      dispatch({ type: SEEN_MESSAGE, payload: seenBy })
    },
    removeSeenEye = (seenBy) => (dispatch) => {
      dispatch({ type: REMOVE_SEEN_MESSAGE, payload: seenBy })
    }
