import axios from "axios"
import React, { useRef } from "react"
import { universityServer } from "servers/endpoints"
import AsyncSelect from "react-select/async"
import { UniSearchDataList } from "graphql/uni"
import { tryCatch } from "ramda"
import { useLazyQuery, useQuery } from "@apollo/client"
import { UNIVERSITY_SERVICE_GQL } from "servers/types"
import { htmlForEditor } from "../utils/htmlForEditor"

const AsyncSelectAtom = ({ item, setPostData, postData }) => {
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

  const fetchMajor = async (majorQuery = " ") => {
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

  const fetechUni = async (uni = " ") => {
    try {
      const response = await axios.get(
        `${universityServer}/keyword/schoolName/${uni}/5`
      )
      return response.data.map((i) => ({
        value: i.name,
        label: i.name.toUpperCase(),
        unitId: i?.unitId
      }))
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  const loadOptions = (inputVal, callback) => {
    let options

    setTimeout(async () => {
      try {
        // const options = await fetchMajor(inputVal)
        if (item.id === "major") {
          options = await fetchMajor(inputVal)
        } else {
          options = await fetechUni(inputVal)
        }
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
      placeholder={item.placeholder || ""}
      ref={ref}
      defaultValue={
        postData && postData.levelOfStudy ? postData.levelOfStudy : null
      }
      onChange={(e) => {
        setPostData((prev) => {

          let obj = {
            ...prev
          }

          if (e?.unitId) {
            obj.unitId = e.unitId
          }
          const postText = htmlForEditor(
            postData?.postText,
            item.name,
            e.value
          )
          obj[item.id] = e.value
          obj.postText = postText
          return obj
        })
      }}
      className="mt-2"
    />
  )
}

export default AsyncSelectAtom
