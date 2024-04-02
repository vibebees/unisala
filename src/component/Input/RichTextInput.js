/* eslint-disable no-bitwise */
/* eslint-disable no-implicit-coercion */
import { authInstance } from "api/axiosInstance"
import "quill-mention"
import "quill-mention/dist/quill.mention.css"
import { lazy, useMemo, useRef } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import { universityServer } from "servers/endpoints"

const UniversityList = lazy(() => import("component/thread/UniversityList"))

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

// const mention = {
//   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
//   mentionDenotationChars: ["@", "#"],
//   linkTarget: "_blank",
//   source: async function (searchTerm, renderList) {
//     const data = await getUniversitites(searchTerm)
//     renderList(data, searchTerm)
//   },
//   onSelect: (item, insertItem) => {
//     // const link = document.createElement("a")
//     // link.href = item.link
//     // link.innerHTML = item.value
//     // link.target = "_blank"

//     // insertItem({
//     //   denotationChar: "",
//     //   id: "193858",
//     //   index: "4",
//     //   Link: "https://unisala.com/university/new",
//     //   value: "New York University"
//     // })
//     insertItem(item)
//   }
// }

const RichTextInput = ({
  value,
  onChange,
  showUniversityListOnAt,
  id = "rich-text-input",
  handleUniversitySelect,
  searchText
}) => {
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
      [{ font: [] }],
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
      {/* <UniversityList
        setPopoverOpen={setPopoverOpen}
        popoverOpen={popoverOpen}
        searchText={searchText}
        handleUniversitySelect={(e) => handleUniversitySelect(e)}
      /> */}
    </div>
  )
}

export default RichTextInput
