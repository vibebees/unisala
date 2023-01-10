import { GET_USER_PROFILE } from "./types"

export const getUserProfile = (data) => {
    return {
        type: GET_USER_PROFILE,
        payload: data
    }
}
