import { useSelector } from "react-redux"
import { PostModalOnClick } from "./molecules/PostModalOnClick"
import { PostCardForClick } from "./molecules/PostCardForClick"
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
      const res = await axios.get(userServer + "/getMetadataTags")
      setMeta(res.data)
    }
    fn()
  }, [])
  return (
    <>
      <PostModalOnClick allProps={allProps} />
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
