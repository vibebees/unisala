import React, { useState } from "react"
import { Link } from "react-router-dom"
import linkifyHtml from "linkify-html"
import "./index.css" // Import your custom CSS

const ThreadExpand = ({ htmlText, maxLines, _id }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
const isLongText = htmlText?.split(".").length > maxLines

  let processedText = htmlText
  if (!isExpanded && isLongText) {
    processedText = htmlText.split(".").slice(0, maxLines).join(".") + (maxLines ? "..." : "")
  }

  const linkifiedText = linkifyHtml(processedText, {
    defaultProtocol: "https",
    className: "custom-link",
    target: {
      url: "_blank" // Opens links in a new tab
    }
  })

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: linkifiedText }} className="custom-link" />
      {isLongText && (
        <button
          onClick={toggleExpand}
          className="bg-neutral-200 border border-neutral-200 px-2 my-2 py-1 rounded-md hover:bg-neutral-300 transition-colors duration-200 ease-linear text-sm text-black"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  )
}
export default ThreadExpand
