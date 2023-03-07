import { combineReducers } from "redux"
import introductionReducer from "./intro"
import auth from "./auth"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import University from "./university"
import UserProfile from "./userProfile"

const rootReducer = combineReducers({
    introductionQuestionAnswered: introductionReducer,
    auth: auth,
    university: University,
    userProfile: UserProfile
})
const persistConfig = {
    key: "development1",
    storage
}

export default persistReducer(persistConfig, rootReducer)
