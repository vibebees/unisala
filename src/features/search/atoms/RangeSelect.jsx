import React, { useEffect } from "react"
import { IonCol, IonLabel, IonSelect, IonSelectOption } from "@ionic/react"
import { URLgetter, URLupdate } from "utils/lib/URLupdate"
import { useHistory } from "react-router"

const RangeSelect = ({
  options,
  Label,
  urlKey,
  placeholder = "",
  showDollarSign = false
}) => {
  const [selected, setSelected] = React.useState("")
  const history = useHistory()
  const handleChanges = (e) => {
    let min = e.target.value.min
    let max = e.target.value.max
    let urlformat = min + "-" + max
    const data = URLupdate(urlKey, urlformat)
    history.push({ search: data.toString() })
  }

  useEffect(() => {
    const data = URLgetter(urlKey)

    if (data) {
      let newData = data.split("-")
      let min = parseInt(newData[0])
      let max = parseInt(newData[1])
      let obj = { min: min, max: max }

      setSelected(obj)
    }
  }, [history.location.search])

  const dollarSign = (text, extra) => {
    if (showDollarSign) {
      return text + extra
    } else {
      return text
    }
  }

  const selectedText = () => {
    if (!selected) return placeholder

    if (selected.min === 0 && selected.max === 0) {
      return "Free"
    } else if (
      selected.max === null ||
      typeof selected.max !== "number" ||
      selected.max.toString() === "NaN"
    ) {
      return dollarSign(selected.min, "$+")
    } else {
      const returnText = selected.min + "-" + selected.max
      return dollarSign(returnText, "$")
    }
  }

  return (
    <IonCol>
      <IonLabel className="mt-3">{Label}</IonLabel>
      <IonSelect
        interface="popover"
        placeholder={placeholder}
        className="border border-[gray] h-7  "
        onIonChange={handleChanges}
        selectedText={selectedText()}
      >
        {options.map((val, i) => (
          <IonSelectOption key={i} value={val}>
            {val.max === 0
              ? "Free"
              : val.max === null
              ? dollarSign(val.min, "$+")
              : dollarSign(val.min + "-" + val.max, "$")}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonCol>
  )
}

export default RangeSelect
