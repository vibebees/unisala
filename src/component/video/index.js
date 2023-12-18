import React from "react"
import {IonCard, IonCardContent, IonTitle} from "@ionic/react"
import VideoPlayer from "./videoPlayer"
const VideoCard = ({videoSrc}) => {
    return (
   <VideoPlayer url={videoSrc} />
    )
}
export default VideoCard
