import axios from "axios"
import React, { useRef } from "react"
import { universityServer } from "servers/endpoints"
import AsyncSelect from "react-select/async"

const AsyncSelectAtom = ({ item, setPostData }) => {
  const ref = useRef()
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
  const fetchModel = async (majorQuery = " ") => {
    try {
      const response = await axios.get(
        `${universityServer}/keyword/majors/${majorQuery}/5`
      )
      return response.data.map((i) => ({
        value: i.name,
        label: i.name.toUpperCase()
      }))
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  const loadOptions = (inputVal, callback) => {
    setTimeout(async () => {
      try {
        const options = await fetchModel(inputVal)
        callback(options)
      } catch (error) {
        console.error("Error loading options:", error)
      }
    }, 1000)
  }
  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      styles={customStyles}
      menuPlacement="bottom"
      placeholder="Search for a major..."
      ref={ref}
      onChange={(e) => setPostData((prev) => ({ ...prev, [item.id]: e.value }))}
      className="mt-2"
    />
  )
}

export default AsyncSelectAtom
