import { GET_USER_PROFILE, GET_USER_FRIENDS, GET_USER_MESSAGES, MY_NETWORK_RECENT_MESSAGES } from "./types"

export const
    getUserProfile = (data) => {
        return {
            type: GET_USER_PROFILE,
            payload: data
        }
    },
    getUserFriends = (data) => {
        return {
            type: GET_USER_FRIENDS,
            payload: data
        }
    },
    getUserMessages = (data) => {
        return {
            type: GET_USER_MESSAGES,
            payload: data
        }
    },
    setMyNetworkRecentMessages = (data) => {
        return (dispatch) => {
            dispatch({
                type: MY_NETWORK_RECENT_MESSAGES,
                payload: data
            })
          }
    }
