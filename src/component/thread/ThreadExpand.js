import React, { useState, useRef, useEffect } from "react"
import linkifyHtml from "linkify-html"
import "./index.css" // Import your custom CSS
import clsx from "clsx"
import {LikeATag} from "component/tags"
import {Link} from "react-router-dom"
import {IonCard, IonModal} from "@ionic/react"

const ThreadExpand = ({ htmlText, maxLines, thread = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSeeMore, setShowMore] = useState(true)
  const TextRef = useRef(null)
  //https://www.youtube.com/embed/qIg4gbGOG_g?si=rq2vf3f8JahBPpQX
 const {tags = [], link = false, videoURL = ""} = thread
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (TextRef.current) {
      const textlength = TextRef?.current?.innerText?.split(" ").length
      if (textlength < 40) {
        setShowMore(false)
      } else {
        setShowMore(true)
      }
    }
  }, [])

  const linkifiedText = linkifyHtml(htmlText, {
    defaultProtocol: "https",
    className: "custom-link",
    target: {
      url: "_blank" // Opens links in a new tab
    }
  })

  const PostBodyText = () => (
    <div
      dangerouslySetInnerHTML={{__html: linkifiedText}}
      className={clsx(
        "custom-link ",
        showSeeMore && !isExpanded ? "line-clamp-5" : "line-clamp-none"
      )}
      ref={TextRef}
    />
  )
  const PostBodyVideo = () => {
    return (
      <div className="mobile-video-style">
         <iframe
        src={videoURL}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
          style={{width: "100%", height: "auto", aspectRatio: "16 / 9"}} // Set width to 100% and height automatically adjusted to maintain aspect ratio
        ></iframe>
      </div>

    )
    // return (
    //   <IonModal isOpen={true} cssClass="my-custom-class">
    //     <iframe
    //       src={videoURL}
    //       title="YouTube video player"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //       allowFullScreen={true}
    //       style={{width: "100%", height: "auto", aspectRatio: "16 / 9"}} // Set width to 100% and height automatically adjusted to maintain aspect ratio
    //     ></iframe>
    //   </IonModal>
    // )
  }



  const TagsList = () => (
    <div className="tags-container">
      {tags?.map((tag) => (
        <Link to={`/space/${tag.name}`} key={tag._id} className="tag-link">
            <LikeATag colorTitle="blue" colorValue="yellow" title="NSAS" value={"NSAS"} key={0} />
        </Link>
      ))}
    </div>
  )
  return (
    <div>
      <PostBodyText />
      <TagsList />
      {videoURL && <PostBodyVideo />}

      {showSeeMore && (
        <button
          onClick={toggleExpand}
          className={clsx(
            "bg-neutral-200 border border-neutral-200 px-2 my-2 py-1 rounded-md hover:bg-neutral-300 transition-colors duration-200 ease-linear text-sm text-black"
          )}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  )
}
export default ThreadExpand
