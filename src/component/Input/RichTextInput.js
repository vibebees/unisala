/* eslint-disable no-bitwise */
/* eslint-disable no-implicit-coercion */
import { authInstance } from "api/axiosInstance"
import "quill-mention"
import "quill-mention/dist/quill.mention.css"
import { useMemo, useRef } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import { universityServer } from "servers/endpoints"

const Link = Quill.import("formats/link")
Link.sanitize = function (url) {
  // quill by default creates relative links if scheme is missing.
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `http://${url}`
  }
  return url
}

const getUniversitites = async (searchTerm) => {
  try {
    const res = await authInstance.get(
      `${universityServer}/keyword/schoolname/${
        searchTerm.trim().length === 0 ? "New York" : searchTerm.trim()
      }/5`
    )
    const formattedData = res.data.map((item) => {
      return {
        id: item?.unitId,
        value: item?.name,
        link: `https://unisala.com/university/${item?.name}`
      }
    })

    return formattedData
  } catch (error) {
    console.log(error)
  }
}

Quill.register(Link, true)

const RichTextInput = ({ value, onChange, id = "rich-text-input" }) => {
  const quillRef = useRef(null)

  const mention = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      linkTarget: "_blank",
      source: async function (searchTerm, renderList) {
        const data = await getUniversitites(searchTerm)
        renderList(data, searchTerm)
      },
      onSelect: (item, insertItem) => {
        const editor = quillRef.current.getEditor()
        insertItem({
          denotationChar: "",
          value: ""
        })
        const cursorPosition = editor.getSelection().index
        editor.insertText(cursorPosition - 2, item.value, "link", item.link)
        editor.setSelection(cursorPosition)
      }
    }),
    []
  )

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [
        { color: [] },
        { background: [] },
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "link",
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { indent: "-1" },
        { indent: "+1" },

        "clean"
      ]
    ],
    clipboard: {
      matchVisual: false
    },
    mention
  }

  return (
    <div>
      <div className="h-full  text-black relative">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          id={id}
          style={{
            minHeight: "200px"
          }}
          className=" text-black  w-full"
          value={value}
          modules={modules}
          onChange={(e) => {
            onChange(e)
          }}
        />
      </div>
    </div>
  )
}

export default RichTextInput
