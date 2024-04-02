import axios from "axios"
import {Card} from "component/ui"
import Modal from "component/ui/Modal"
import {usePathName} from "hooks/usePathname"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useHistory} from "react-router"
import {userServer} from "servers/endpoints"
import {PostCardForClick} from "../organisim/PostCardForClick"
import {PostModalOnClick} from "../organisim/PostModalOnClick"
const CreateAPostCard = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)
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
      <Card
        style={{ marginBottom: "12px" }}
        onClick={() => {
          // params.append("create", "y")
          // if (allProps.unitId) {
          //   params.append("unitId", allProps.unitId)
          // }
          // history.push({
          //   search: params.toString()
          // })
          // setCreateAPostPopUp(true)
          // console.log("clicked")
        }}
        className="ion-no-margin ion-no-padding"
      >
        <Modal
          ModalData={<PostModalOnClick allProps={allProps} metaData={meta} />}
          ModalButton={<PostCardForClick />}
          header="Create a Post"
        />
      </Card>
    </>
  )
}

export default CreateAPostCard
