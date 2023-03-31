import { MESSAGE_TO_PROFILE, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_SUCCESS_FINALLY, SEEN_MESSAGE } from "../types/messengerType"

const initialState = {
    messagingTo: null,
    messageUpdated: false,
    lastMessageRead: []
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
        case SEEN_MESSAGE:
            return {
                ...state,
                lastMessageRead: [...state.lastMessageRead, payload]
            }
        default:
            return state
    }
}

export default userActivity
