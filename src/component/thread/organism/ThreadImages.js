import React from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import FullScreenImage from "component/Reusable/Image/FullScreenImage"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ThreadImages = ({ images, _id }) => {
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  }

  if (images.length === 0) return null

  return (
    <Link to={`/thread/${_id}`} className={clsx("relative")}>
      <Swiper pager={true} options={slideOpts} className="static">
        {images.map((image, index) => (
          <>
            <SwiperSlide className="" key={index}>
              <ImageWithLoader
                src={image}
                alt={image}
                fullScreenImage={true}
                className="w-full max-h-96 object-contain"
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </Link>
  )
}

export default ThreadImages
