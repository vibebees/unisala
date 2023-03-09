import { MESSAGE_TO_PROFILE } from "../types/messengerType"

const initialState = {
   messagingTo: null
}

const userActivity = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case MESSAGE_TO_PROFILE:
            return {
                ...state,
                messagingTo: payload
            }
        default:
            return state
    }
}

export default userActivity
