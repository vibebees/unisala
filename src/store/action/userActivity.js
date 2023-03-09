import { MESSAGE_TO_PROFILE } from "../types/messengerType"
import { GET_USER_PROFILE, GET_USER_FRIENDS, GET_USER_MESSAGES } from "./types"

export const
    sendMessageTo = (data) => {
      return (dispatch) => {
        dispatch({
          type: MESSAGE_TO_PROFILE,
          payload: data
        })
      }
    }
