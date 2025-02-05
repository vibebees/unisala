import axios from "axios"
import { Card } from "component/ui"
import Modal from "component/ui/Modal"
import { usePathName } from "hooks/usePathname"
import { useEffect, useState } from "react"
import { userServer } from "servers/endpoints"
import { PostCardForClick } from "../organisim/PostCardForClick"
import { PostModalOnClick } from "../organisim/PostModalOnClick"
const CreateAPostCard = ({ allProps }) => {
  const [meta, setMeta] = useState({})
  const pathname = usePathName(0) || "home"

  useEffect(() => {
    const cacheKey = `metadata-${pathname}`
    const cachedMeta = localStorage.getItem(cacheKey)

    const fn = async () => {
      if (cachedMeta) {
        const cachedData = JSON.parse(cachedMeta)
        setMeta(cachedData)
      } else {
        try {
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
          localStorage.setItem(cacheKey, JSON.stringify(addAPost))
        } catch (error) {
          console.error("Failed to fetch metadata", error)
        }
      }
    }

    fn()
  }, [pathname])

  return (
    <>
      <Card
        style={{ marginBottom: "12px" }}
        className="ion-no-margin ion-no-padding"
      >
        <Modal
          ModalData={<PostModalOnClick allProps={allProps} metaData={meta} />}
          ModalButton={<PostCardForClick />}
        />
      </Card>
    </>
  )
}

export default CreateAPostCard
