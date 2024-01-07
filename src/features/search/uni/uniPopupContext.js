import {createContext, useContext, useState} from "react"

const UniPopupContext = createContext()

export const UniPopupProvider = ({ children }) => {
  const [popUp, setPopUp] = useState(true)
  const closePopup = () => setPopUp(false)

  return (
    <UniPopupContext.Provider value={{ popUp, setPopUp, closePopup }}>
      {children}
    </UniPopupContext.Provider>
  )
}
export const useUniPopup = () => useContext(UniPopupContext)
