// ImageCollage.js
import React, { useState } from "react"
import Modal from "react-modal"

Modal.setAppElement("#root") // Set the root element

const ImageCollage = ({ images }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const openModal = (image) => {
    setSelectedImage(image)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setSelectedImage(null)
    setModalIsOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2   md:grid-cols-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="cursor-pointer w-full h-44 max-md:h-32 object-cover border-2 border-neutral-700 hover:opacity-80"
            onClick={() => openModal(image)}
          />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal border-4 rounded-lg border-neutral-900 relative w-fit max-w-[90vw] max-md:w-[95vw]  mx-auto h-fit max-h-[90vh] max-md:h-fit mt-6 bg-neutral-900 overflow-y-scroll imageModal"
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Image "
            className="w-fit max-w-[90vw] max-md:w-[95vw]  mx-auto h-fit max-h-[90vh] max-md:h-fit "
          />
        )}
        <button
          onClick={closeModal}
          className="absolute -top-1  right-0 group hover:bg-neutral-950 transition-all duration-200 ease-linear  w-8 rounded-bl-full bg-neutral-700 text-neutral-300 text-3xl"
        >
          <span className="relative -top-1 group-hover:text-white transition-all duration-200 ease-linear -right-1">
            &times;
          </span>
        </button>
      </Modal>
    </div>
  )
}

export default ImageCollage
