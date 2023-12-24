import { useSelector } from "react-redux"
import { PostModalOnClick } from "../organisim/PostModalOnClick"
import { PostCardForClick } from "../organisim/PostCardForClick"
import { IonCard, IonTitle } from "@ionic/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { userServer } from "servers/endpoints"
export const CreateAPostCard = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { setCreateAPostPopUp } = allProps
  const [meta, setMeta] = useState({})

  useEffect(() => {
    const fn = async () => {
      const res = await axios.get(userServer + "/getMetadataTags", {
        headers: {
          authorization: localStorage.getItem("accessToken")
        }
      })

      setMeta(res.data?.data)
    }
    fn()
  }, [])

  console.log({ meta })
  return (
    <>
      <PostModalOnClick allProps={allProps} metaData={meta} />
      <IonCard
        style={{ marginBottom: "20px" }}
        onClick={() => {
          setCreateAPostPopUp(true)
        }}
      >
        <PostCardForClick allProps={{ ...allProps, user }} />
      </IonCard>
    </>
  )
}
