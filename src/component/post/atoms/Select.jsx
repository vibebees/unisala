import React from "react"
import ReactSelect from "react-select"

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
      let newHtml = `<h3> ${
        item.name
      } : <strong> ${e.value.toUpperCase()} </strong></h3>`
      let postText
      if (postData.postText) {
        console.log("hehehe", postData.postText)
        postText = postData.postText + newHtml
        console.log("after", postText)
      } else {
        postText = newHtml
      }
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
      defaultValue={
        postData && postData.levelOfStudy ? postData.levelOfStudy : null
      }
      onChange={handleChange}
    />
  )
}

export default SelectAtom
