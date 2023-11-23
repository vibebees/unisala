import React, { useState } from "react"
import { Link } from "react-router-dom"

const ThreadExpand = ({ htmlText, maxLines, _id }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const isLongText = htmlText?.split(".").length > maxLines

  const truncatedText =
    isExpanded || !isLongText
      ? htmlText
      : htmlText.split(".").slice(0, maxLines).join(".")

  return (
    <div>
      <Link to={`/thread/${_id}`}>
        <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
      </Link>
      {isLongText && (
        <button
          onClick={toggleExpand}
          className="bg-neutral-200  border  border-neutral-200  px-2 my-2 py-1 rounded-md hover:bg-neutral-300 transition-colors duration-200 ease-linear text-sm text-black"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  )
}

export default ThreadExpand
