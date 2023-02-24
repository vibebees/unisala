export const initial = {}
const auth = (state = initial, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return state
        default:
            return state
    }
}
export default auth
