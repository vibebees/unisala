import { MESSAGE_TO_PROFILE, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_SUCCESS_FINALLY } from "../types/messengerType"

const initialState = {
    messagingTo: null,
    messageUpdated: false
}

const userActivity = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case MESSAGE_TO_PROFILE:
            return {
                ...state,
                messagingTo: payload
            }
        case MESSAGE_SEND_SUCCESS:
            return {
                ...state,
                messageUpdated: true
            }
        case MESSAGE_SEND_SUCCESS_FINALLY:
            return {
                ...state,
                messageUpdated: false
            }
        default:
            return state
    }
}

export default userActivity
