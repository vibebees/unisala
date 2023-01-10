import { GET_USER_PROFILE } from "../action/types"

const initialState = {
    profileData: {}
}

const UserProfile = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                profileData: payload
            }

        default:
            return state
    }
}

export default UserProfile
