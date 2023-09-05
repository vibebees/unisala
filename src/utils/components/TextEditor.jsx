import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const TextEditor = ({ postText, setPostText }) => {
  return (
    <ReactQuill
      value={postText}
      onChange={(e) => {
        setPostText(e)
      }}
      theme="snow"
      className="h-44 text-black"
    />
  )
}

export default TextEditor
