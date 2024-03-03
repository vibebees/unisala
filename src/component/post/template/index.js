import { useSelector } from "react-redux"
import { PostModalOnClick } from "../organisim/PostModalOnClick"
import { PostCardForClick } from "../organisim/PostCardForClick"
import { IonCard, IonTitle } from "@ionic/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { userServer } from "servers/endpoints"
import { useHistory } from "react-router"
import { usePathName } from "hooks/usePathname"
export const CreateAPostCard = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { setCreateAPostPopUp } = allProps
  const [meta, setMeta] = useState({})
  const history = useHistory()
  const params = new URLSearchParams(window.location.href.search)
  const pathname = usePathName(0) || "home"

  useEffect(() => {
    const fn = async () => {
      const createAPostMetaData = await axios.get(
        userServer + "/getMetadataTags",
        {
          headers: {
            authorization: localStorage.getItem("accessToken")
          }
        }
      )

      const metaData = createAPostMetaData.data?.data || []
      const getCurrentPageMetaData = metaData[pathname] || {}
      const { addAPost } = getCurrentPageMetaData || {}
      setMeta(addAPost)
    }
    fn()
  }, [])
  return (
    <>
      <PostModalOnClick allProps={allProps} metaData={meta} />
      <IonCard
        style={{ marginBottom: "12px" }}
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
        className="ion-no-margin ion-no-padding"
      >
        <PostCardForClick allProps={{ ...allProps, user }} />
      </IonCard>
    </>
  )
}
