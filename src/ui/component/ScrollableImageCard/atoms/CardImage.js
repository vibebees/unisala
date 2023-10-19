import React from "react"

const CardImage = ({ image }) => {
  return (
    <div className="w-48 h-56">
      <img src={image} alt="college" className="h-full w-full object-cover" />
    </div>
  )
}

export default CardImage
