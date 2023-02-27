import { GET_USER_PROFILE, GET_USER_FRIENDS, GET_USER_MESSAGES } from "./types"

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
    }
