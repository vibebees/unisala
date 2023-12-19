import { useSelector } from "react-redux"
import { PostModalOnClick } from "./molecules/PostModalOnClick"
import { PostCardForClick } from "./molecules/PostCardForClick"
import { IonCard, IonTitle } from "@ionic/react"
export const CreateAPostCard = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { setCreateAPostPopUp } = allProps

  return (
    <>
      <PostModalOnClick allProps={allProps} />
      <IonCard
        style={{ marginBottom: "20px" }}
        onClick={() => {
          setCreateAPostPopUp(true)
        }}
        className="max-md:mx-1"
      >
        <PostCardForClick allProps={{ ...allProps, user }} />
      </IonCard>
    </>
  )
}
