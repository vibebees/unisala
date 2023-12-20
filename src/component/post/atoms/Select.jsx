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
  return (
    <ReactSelect
      options={modifiedOptions}
      styles={customStyles}
      menuPlacement="bottom"
      defaultValue={
        postData && postData.levelOfStudy ? postData.levelOfStudy : null
      }
      onChange={(e) => {
        console.log(e, item.id)
        setPostData((prev) => {
          let obj = {
            ...prev
          }
          obj[item.id] = e.value
          return obj
        })
      }}
    />
  )
}

export default SelectAtom
