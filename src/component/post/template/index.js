import { useSelector } from "react-redux"
import { PostModalOnClick } from "../organisim/PostModalOnClick"
import { PostCardForClick } from "../organisim/PostCardForClick"
import { IonCard, IonTitle } from "@ionic/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { userServer } from "servers/endpoints"
import {useHistory} from "react-router"

const usePathName = (index) => {
  let currPath = window.location.pathname.split("/").filter((str) => str !== "")
  const selectedSegment = currPath[index] || ""

  return selectedSegment
}

export const CreateAPostCard = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { setCreateAPostPopUp } = allProps
  const [meta, setMeta] = useState({})
  const history = useHistory()
  const params = new URLSearchParams(window.location.href.search)
  const pathname = usePathName(0) || "home"

  useEffect(() => {
    const fn = async () => {
      const res = await axios.get(userServer + "/getMetadataTags", {
        headers: {
          authorization: localStorage.getItem("accessToken")
        }
      })
      const metaData = res.data?.data || []
      const getCurrentPageMetaData = metaData[pathname] || {}
      const {addAPost} = getCurrentPageMetaData || {}
      setMeta(addAPost)
    }

    fn()
  }, [])

  return (
    <>
      <PostModalOnClick allProps={allProps} metaData={meta} />
      <IonCard
        style={{ marginBottom: "20px" }}
        onClick={() => {
          params.append("create", "y")
          if (allProps.unitId) {
            params.append("unitId", allProps.unitId)
          }
          history.push({
            search: params.toString()
          })
          setCreateAPostPopUp(true)
        }}
      >
        <PostCardForClick allProps={{ ...allProps, user }} />
      </IonCard>
    </>
  )
}
