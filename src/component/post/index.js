import { useSelector } from "react-redux"
import { PostModalOnClick } from "./molecules/PostModalOnClick"
import { PostCardForClick } from "./molecules/PostCardForClick"
import { IonCard, IonTitle } from "@ionic/react"
import { useContext } from "react"
import { HomePageContext } from "features/home/HomePageContext"
export const CreateAPostCard = () => {
  const { allProps } = useContext(HomePageContext)

  const { setCreateAPostPopUp } = allProps

  return (
    <>
      <PostModalOnClick />
      <IonCard
        style={{ marginBottom: "20px" }}
        onClick={() => {
          setCreateAPostPopUp(true)
        }}
      >
        <PostCardForClick />
      </IonCard>
    </>
  )
}
