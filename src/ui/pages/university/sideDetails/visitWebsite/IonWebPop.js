import React from "react"
import { IonPopover } from "@ionic/react"
import Tabs from "./Tab"
import "./VisitWebsite.css"
import { useSelector } from "react-redux"

const IonWebPop = ({ setPopup, popup }) => {
  const { uniData } = useSelector((store) => store?.university)

  const [activeTab, setActiveTab] = React.useState(0)
  const HandleTabClick = (index) => {
    setActiveTab(index)
  }
  const urls = uniData?.elevatorInfo?.urls
  const isUrl = (url) => {
    return url?.includes("http") ? url : `https:\\${url}`
  }
  return (
    <IonPopover
      size="cover"
      className="popover"
      onDidDismiss={() => setPopup(false)}
      isOpen={popup}
    >
      <Tabs activeTab={activeTab} HandleTabClick={HandleTabClick} />
      <iframe
        src={
          activeTab === 0
            ? isUrl(urls?.home)
            : activeTab === 1
            ? isUrl(urls?.onlineApplication) || urls?.home
            : activeTab === 2
            ? isUrl(urls?.financialAid) || urls?.home
            : activeTab === 3
            ? isUrl(urls?.admissions) || urls?.home
            : urls?.home
        }
        title="Online Web"
        style={{
          width: "100%",
          height: "80vh",
          border: "none"
        }}
      ></iframe>
    </IonPopover>
  )
}
export default IonWebPop
