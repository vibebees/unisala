import React from "react"
import ReactPlayer from "react-player"

const VideoPlayer = ({ url = "https://video.xx.fbcdn.net/v/t42.1790-2/344922461_794474335609033_8613219910594403171_n.mp4?_nc_cat=107&ccb=1-7&_nc_sid=55d0d3&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=wnwhp1C6FhAAX-GUsUS&_nc_rml=0&_nc_ht=video-atl3-1.xx&oh=00_AfD2Z8sssonO6PKx-GjK9sA89tHB76Z135hAIvAOYDxblQ&oe=6583EA5B" }) => {
  return (
    <div className="aspect-w-16 aspect-h-9"> {/* Using Tailwind's aspect ratio plugin */}
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        height="100%"
        controls
      />
    </div>
  )
}
export default VideoPlayer
