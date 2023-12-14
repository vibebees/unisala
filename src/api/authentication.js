import axios from "axios"
 import jwtDecode from "jwt-decode"
import {userServer} from "servers/endpoints"
import {getUserProfile} from "store/action/userProfile"

export const getNewToken = async (dispatch = () => {}) => {
    if (!localStorage.getItem("refreshToken")) {
      window.location.assign("/login")
    }
    try {
      const { data } = await axios.post(userServer + "/refreshToken", {
        refreshToken: localStorage.getItem("refreshToken")
      })
      if (!data.success) {
        const {error} = data || {}
        if (error?.name === "TokenExpiredError") {
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("accessToken")
          window.location.assign("/login")
        }
        dispatch(getUserProfile({ user: {}, loggedIn: false }))
      }
      data?.refreshToken &&
        localStorage.setItem("refreshToken", data?.refreshToken || "")
      data?.accessToken &&
        localStorage.setItem("accessToken", data?.accessToken || "")
      const decode = jwtDecode(data?.accessToken)

      dispatch(getUserProfile({user: {...decode}, loggedIn: Boolean(decode)}))
      return data?.accessToken
    } catch (error) {

      console.log(error)
    }
  }
