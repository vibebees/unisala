import React from "react"
import Thread from "../../../component/thread"
import { IonContent } from "@ionic/react"

const SpaceIndexFeed = ({ posts }) => {
  return (
    Array.isArray(posts) &&
    posts.map((thread) => <Thread key={thread._id} thread={thread} />)
  )
}

export default SpaceIndexFeed
