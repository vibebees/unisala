import LeftArrow from "Icons/LeftArrow"
import { Button } from "component/ui"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import "react-quill/dist/quill.snow.css"
import { useLocation } from "react-router-dom"
import "../index.css"
import Form from "../molecules/Form"
import FormAvatar from "../molecules/FormAvatar"
import NotLogggedModal from "./NotLogggedModal"
import SelectionTab from "./SelectionTab"

export const PostModalOnClick = ({ allProps, metaData }) => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const { tags } = allProps
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("st") || null
  )
  const [allowPost, setAllowPost] = useState(true)
  const [domloaded, setDomLoaded] = useState(false)
  const [postData, setPostData] = useState(
    JSON.parse(localStorage.getItem("postData")) || {}
  )

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  /* useEffect(() => {
    setPostData((prevPostData) => {
      return {
        ...prevPostData,
        id: selectedTab,
        unitId: parseFloat(params.get("unitId")) || null,
        tags: allProps.tags && tags
      }
    })
  }, [selectedTab])*/

  const handleTabSelection = (item) => {
    setSelectedTab(item)
    setPostData((prevPostData) => {
      return {
        ...prevPostData,
        id: item,
        unitId: parseFloat(params.get("unitId")) || null,
        tags: allProps.tags && tags
      }
    })
    localStorage.setItem("st", item)
  }

  return (
    <>
      {allowPost && (
        <div className="overflow-y-scroll threadScroll px-1 h-full ">
          {!selectedTab ? (
            <SelectionTab
              metaData={metaData}
              onClick={(item) => handleTabSelection(item)}
            />
          ) : (
            <>
              <br />
              <FormAvatar />

              {metaData && (
                <Form
                  metaData={metaData[selectedTab]}
                  postData={postData}
                  setPostData={setPostData}
                  allProps={allProps}
                />
              )}
            </>
          )}
        </div>
      )}
      {domloaded &&
        selectedTab &&
        createPortal(
          <Button
            className="modal-close-btn  "
            onClick={() => {
              setSelectedTab(null)
            }}
          >
            <LeftArrow /> <span className="text-neutral-600">Back</span>
          </Button>,
          document.getElementById("modal-start")
        )}
      {domloaded &&
        selectedTab &&
        createPortal(
          <p>{metaData[selectedTab]?.name}</p>,
          document.getElementById("modal-header")
        )}

      {!allowPost && <NotLogggedModal setAllowPost={setAllowPost} />}
    </>
  )
}
