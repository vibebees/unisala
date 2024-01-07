import React, { useState } from "react"
import SingleUniversityList from "../atoms/SingleUniversityList"
import { authInstance } from "api/axiosInstance"
import { userServer } from "servers/endpoints"
import { URLgetter } from "utils/lib/URLupdate"

const Lists = () => {
  const id = URLgetter("id")
  const [universitiesList, setUniversitiesList] = useState([])
  const getAllLists = async () => {
    const res = await authInstance.get(`${userServer}/get-list-details/${id}`)
    if (res.data.success) {
      setUniversitiesList(res.data?.data?.unitDetails)
    }
  }

  React.useEffect(() => {
    getAllLists()
  }, [])

  return (
    <div className="w-full">
      {universitiesList &&
        universitiesList.length > 0 &&
        universitiesList.map((list, index) => (
          <SingleUniversityList key={index} {...list} />
        ))}
      {universitiesList.length === 0 && (
        <div className="text-center text-lg">No universities found!</div>
      )}
    </div>
  )
}

export default Lists
