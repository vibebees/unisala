import React, { useEffect, useState, useContext } from "react"
import SingleList from "../atoms/SingleList"
import { authInstance } from "api/axiosInstance"
import { userServer } from "servers/endpoints"
import { ListContext } from ".."

const ListContainer = () => {
  const { setLists, lists } = useContext(ListContext)
  const getAllLists = async () => {
    const res = await authInstance.get(`${userServer}/get-all-list`)
    if (res.data.success) {
      setLists(res.data.data)
    }
  }
  useEffect(() => {
    getAllLists()
  }, [])

  return (
    <div>
      {lists &&
        lists.length > 0 &&
        lists.map((list, index) => <SingleList key={index} {...list} />)}
    </div>
  )
}

export default ListContainer
