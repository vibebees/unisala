import { useSelector } from "react-redux"

import "./professors.css"
import Professor from "../molecules/Professor"

export const Professors = () => {
  const { uniData } = useSelector((store) => store?.university)

  return (
    <div>
      <Professor data={uniData.professors} />
    </div>
  )
}
export default Professors
