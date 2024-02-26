import React, { useState, useEffect, useRef } from "react"
import linkifyHtml from "linkify-html"
import "./index.css" // Import your custom CSS
import clsx from "clsx"
import { LikeATag } from "component/tags"
import { Link } from "react-router-dom"

const ThreadExpand = ({ htmlText, thread = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSeeMore, setShowMore] = useState(true)
  const TextRef = useRef(null)
  const { tags = [], videoURL = "" } = thread
  const [showSeeMoreOptionAtWordCount, setShowSeeMoreOptionAtWordCount] =
    useState(40)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const trimText = (text, wordLimit) => {
    const words = text.split(" ")
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit)?.join(" ") + "..."
    }
    return text
  }

  useEffect(() => {
    const wordCount = htmlText.split(" ").length
    setShowMore(wordCount > showSeeMoreOptionAtWordCount)
  }, [htmlText, showSeeMoreOptionAtWordCount])

  const linkifiedText = linkifyHtml(
    isExpanded ? htmlText : trimText(htmlText, showSeeMoreOptionAtWordCount),
    {
      defaultProtocol: "https",
      className: "custom-link",
      target: {
        url: "_blank" // Opens links in a new tab
      }
    }
  )

  const PostBodyText = () => (
    <div
      className="ql-editor"
      dangerouslySetInnerHTML={{ __html: linkifiedText }}
      ref={TextRef}
    />
  )

  const PostBodyVideo = () => (
    <div className="mobile-video-style">
      <iframe
        src={videoURL}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
        style={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}
      ></iframe>
    </div>
  )

  const TagsList = () => (
    <div className="tags-container">
      {tags?.map((tag) => (
        <Link to={`/space/${tag.name}`} key={tag._id} className="tag-link">
          <LikeATag
            colorTitle="blue"
            colorValue="yellow"
            title="NSAS"
            value={"NSAS"}
            key={tag._id}
          />
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
            "bg-neutral-200 border  border-neutral-200 px-2 my-2 py-1 rounded-md hover:bg-neutral-300 transition-colors duration-200 ease-linear text-sm text-black"
          )}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  )
}

export default ThreadExpand
