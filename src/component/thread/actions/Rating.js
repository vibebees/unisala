import React from "react"
import CircleRating from "component/circleRating"

const Rating = ({ label, rating = null }) => {
  if (!rating) return null
  return (
    <div className="flex justify-between   items-center">
      <p className="text-blue-500">{label} </p>
      <div className="w-7 h-7 relative">
        <CircleRating rating={rating} />
      </div>
    </div>
  )
}

export default Rating
