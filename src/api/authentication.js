import axios from "axios"
import {getUserProfile} from "graphql/user"
 import jwtDecode from "jwt-decode"
import {userServer} from "servers/endpoints"

export const getNewToken = async (dispatch) => {
    if (!localStorage.getItem("refreshToken")) {
      dispatch(getUserProfile({ user: {}, loggedIn: false }))
      return
    }
    try {
      const { data } = await axios.post(userServer + "/refreshToken", {
        refreshToken: localStorage.getItem("refreshToken")
      })
      if (!data.success) {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        dispatch(getUserProfile({ user: {}, loggedIn: false }))
      }
      data?.refreshToken &&
        localStorage.setItem("refreshToken", data?.refreshToken || "")
      data?.accessToken &&
        localStorage.setItem("accessToken", data?.accessToken || "")
      const decode = jwtDecode(data?.accessToken)

      dispatch(
        getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) })
      )
    } catch (error) {
      console.log(error)
    }
  }
