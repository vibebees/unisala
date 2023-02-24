import { GET_USER_PROFILE, GET_USER_FRIENDS } from "../action/types"

const initialState = {
    profileData: {},
    friendList: []
}

const UserProfile = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                profileData: payload
            }
        case GET_USER_FRIENDS:
            return {
                ...state,
                friendList: payload
            }
        default:
            return state
    }
}

export default UserProfile
