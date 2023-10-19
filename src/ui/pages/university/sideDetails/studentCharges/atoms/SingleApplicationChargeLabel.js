import React from "react"

const SingleApplicationChargeLabel = ({ label, data }) => {
  return <>{data !== -1 && <h3>{label}</h3>}</>
}

export default SingleApplicationChargeLabel
