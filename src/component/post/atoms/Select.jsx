import React from "react"
import ReactSelect from "react-select"
import { htmlForEditor } from "../utils/htmlForEditor"

const SelectAtom = ({ options, item, setPostData, postData }) => {
  const customStyles = {
    menuList: (styles) => ({
      ...styles
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#eeeee" : isSelected ? "#90EE90" : undefined,
      zIndex: 1
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100
    })
  }
  const modifiedOptions = options.map((option) => ({
    value: option,
    label: option
  }))

  const handleChange = (e) => {
    setPostData((prev) => {
      const postText = htmlForEditor(
        prev.postText,
        item.name,
        e.value.toUpperCase()
      )
      let obj = {
        ...prev
      }
      obj[item.id] = e.value.toLowerCase()
      obj.postText = postText
      return obj
    })
  }
  return (
    <ReactSelect
      options={modifiedOptions}
      styles={customStyles}
      menuPlacement="bottom"
      placeholder={item.placeholder || ""}
      defaultValue={
        postData && postData.levelOfStudy ? postData.levelOfStudy : null
      }
      onChange={handleChange}
    />
  )
}

export default SelectAtom
