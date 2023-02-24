import { GET_USER_PROFILE, GET_USER_FRIENDS } from "./types"

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
    }
