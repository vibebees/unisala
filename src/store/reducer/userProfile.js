import { GET_USER_PROFILE, GET_USER_FRIENDS } from "../action/types"

const initialState = {
    user: {},
    loggedIn: false,
    friendList: []
}

const UserProfile = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                user: payload.user,
                loggedIn: payload.loggedIn
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
