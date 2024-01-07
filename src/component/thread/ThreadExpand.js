import React, { useState, useRef, useEffect } from "react"
import linkifyHtml from "linkify-html"
import "./index.css" // Import your custom CSS
import clsx from "clsx"

const ThreadExpand = ({ htmlText, maxLines }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSeeMore, setShowMore] = useState(true)
  const TextRef = useRef(null)

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

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: linkifiedText }}
        className={clsx(
          "custom-link ",
          showSeeMore && !isExpanded ? "line-clamp-5" : "line-clamp-none"
        )}
        ref={TextRef}
      />

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
