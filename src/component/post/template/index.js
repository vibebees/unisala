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
  const pathname = usePathName(0)

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
      setMeta(createAPostMetaData.data?.data)

      if (pathname === "space") {
        const eventMeta = await axios.get(userServer + "/get-event-metadata", {
          headers: {
            authorization: localStorage.getItem("accessToken")
          }
        })
        setMeta((prev) => ({
          ...prev,
          event: {
            id: "event",
            name: "Event",
            type: "tag",
            edges: Object.keys(eventMeta?.data?.data).map((key) => ({
              id: key,
              ...eventMeta?.data?.data[key]
            }))
          }
        }))
      }
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
