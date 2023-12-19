import React from "react"
import ReactSelect from "react-select"

const SelectAtom = ({ options, item, setPostData }) => {
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
      onChange={(e) => {
        setPostData((prev) => ({
          ...prev,
          [item.id]: e.value.toLowerCase()
        }))
      }}
    />
  )
}

export default SelectAtom
