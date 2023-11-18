import React from "react"

const SingleApplicatonCharge = ({ data }) => {
  return (
    <>
      {data !== -1 && (
        <h1>
          : <span className="px-2 " /> $ {""}
          {data}
        </h1>
      )}
    </>
  )
}

export default SingleApplicatonCharge
