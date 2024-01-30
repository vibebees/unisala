import ReactPlayer from "react-player"

export const VideoPlayer = ({ src }) => (
  <ReactPlayer width={"100%"} controls url={src} />
)
