import {useEffect, useRef} from "react"
import {callSocket} from "../../../servers/endpoints"
import {Home} from "./template"
import {getAllPropsHome} from "./getAllProps"
import {useSelector} from "react-redux"
import {getUserProfile} from "../../../graphql/user"
import {useQuery} from "@apollo/client"
import {UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL} from "../../../servers/types"
import {getUpdatedSchoolInfo} from "../../../graphql/uni"
export default function HomePage({setPopup}) {
  const socket = useRef(null)
  const {user, loggedIn} = useSelector((store) => store?.userProfile || {})

  const { loading, error, data, refetch } = useQuery(getUserProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      username: user?.username
    },
    skip: !loggedIn || !user?.username
  }),
    userInfo = data?.getUser?.user,
    allProps = getAllPropsHome({user, loggedIn, userInfo, refetch})

  useEffect(() => {
    socket.current = callSocket()

    socket.current.on("connect", (msg) => {
      console.log("callSocket connected")
    })

    return () => {
      socket.current.disconnect()
      console.log("callSocket disconnected")
    }

  }, [])
  return <Home setPopup={setPopup} allProps={{...allProps, refetch}} />
}
