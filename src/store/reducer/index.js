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
    University: University,
    UserProfile: UserProfile
})
const persistConfig = {
    key: "development0",
    storage
}

export default persistReducer(persistConfig, rootReducer)
