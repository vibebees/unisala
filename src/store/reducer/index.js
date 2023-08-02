import { combineReducers } from "redux"
import introductionReducer from "./intro"
import auth from "./auth"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import University from "./university"
import UserProfile from "./userProfile"
import userActivity from "./userActivity"

const rootReducer = combineReducers({
    introductionQuestionAnswered: introductionReducer,
    auth: auth,
    university: University,
    userProfile: UserProfile,
    userActivity
})
const persistConfig = {
    key: "developmentF3",
    storage
}

export default persistReducer(persistConfig, rootReducer)
