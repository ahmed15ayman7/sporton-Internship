import React, { useRef } from 'react'
import { Avatar } from './Avatar'
import { Camera } from 'lucide-react'

const ImageProfileEdit = ({image, fallback, setImage,setFile,size = '5xl'}: {image: string, fallback: string, setImage: (image: string) => void, setFile: (file: File) => void, size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | '10xl' | '11xl' | '12xl' | '13xl' | '14xl'}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (file: File) => {
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    }
    reader.readAsDataURL(file);
  }
  return (
    <div className="flex items-center justify-center">
                <div className="relative">
                    <Avatar
                      src={image}
                      fallback={fallback}
                      size={size}
                    />
                   <label className="absolute bottom-0 right-0 bg-primary-main text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition-colors z-40" onClick={() => inputRef.current?.click()}>
                      <Camera className="h-4 w-4" />
                      <input ref={inputRef} type="file" className="hidden" onChange={(e) => handleFileSelect(e.target.files?.[0] as File)} accept="image/*" />
                    </label>
                    
                  </div>  
    </div>
  )
}

export default ImageProfileEdit