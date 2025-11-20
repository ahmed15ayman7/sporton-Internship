import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline';

const ImagePopUp = ({ image ,isOpen, setIsOpen}: { image: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {   
  return (
    // i need a full screen image popup with a close icon button and a download button
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50" style={{width: '90vw', height: '90vh'}}>
      <div className="bg-white rounded-lg p-6 relative w-full h-full">
        <img src={image} alt="image" className="w-full h-full object-contain" />
      <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0">
        <XMarkIcon className="w-6 h-6 text-white bg-red-500 rounded-full p-1" />
      </button>
      </div>

    </div>
  )
}

export default ImagePopUp