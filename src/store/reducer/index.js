import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "redux"
import introductionReducer from "./intro"
import auth from "./auth"

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
    storage: AsyncStorage,
    whitelist: ["introductionQuestionAnswered"]
}

export default persistReducer(persistConfig, rootReducer)
