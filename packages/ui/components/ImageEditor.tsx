'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from './Button';
import { XMarkIcon, CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export interface ImageEditorProps {
  imageSrc: string;
  onSave: (editedImageBlob: Blob) => void;
  onCancel: () => void;
  isOpen: boolean;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  imageSrc,
  onSave,
  onCancel,
  isOpen
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear crop area
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Draw crop border
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Draw corner handles
    const handleSize = 8;
    ctx.fillStyle = '#8B5CF6';
    
    // Top-left
    ctx.fillRect(cropArea.x - handleSize / 2, cropArea.y - handleSize / 2, handleSize, handleSize);
    // Top-right
    ctx.fillRect(cropArea.x + cropArea.width - handleSize / 2, cropArea.y - handleSize / 2, handleSize, handleSize);
    // Bottom-left
    ctx.fillRect(cropArea.x - handleSize / 2, cropArea.y + cropArea.height - handleSize / 2, handleSize, handleSize);
    // Bottom-right
    ctx.fillRect(cropArea.x + cropArea.width - handleSize / 2, cropArea.y + cropArea.height - handleSize / 2, handleSize, handleSize);
  }, [cropArea, imageLoaded]);

  const handleImageLoad = () => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;

    // Set canvas size to match image
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Initialize crop area to center of image
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    const size = Math.min(image.naturalWidth, image.naturalHeight) * 0.8;
    
    setCropArea({
      x: centerX - size / 2,
      y: centerY - size / 2,
      width: size,
      height: size
    });

    setImageLoaded(true);
  };

  React.useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Check if mouse is inside crop area
    if (
      mouseX >= cropArea.x &&
      mouseX <= cropArea.x + cropArea.width &&
      mouseY >= cropArea.y &&
      mouseY <= cropArea.y + cropArea.height
    ) {
      setIsDragging(true);
      setDragStart({ x: mouseX - cropArea.x, y: mouseY - cropArea.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const newX = Math.max(0, Math.min(mouseX - dragStart.x, canvas.width - cropArea.width));
    const newY = Math.max(0, Math.min(mouseY - dragStart.y, canvas.height - cropArea.height));

    setCropArea(prev => ({
      ...prev,
      x: newX,
      y: newY
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    setIsLoading(true);

    try {
      // Create a new canvas for the cropped image
      const croppedCanvas = document.createElement('canvas');
      const croppedCtx = croppedCanvas.getContext('2d');
      if (!croppedCtx) return;

      croppedCanvas.width = cropArea.width;
      croppedCanvas.height = cropArea.height;

      // Draw the cropped portion
      croppedCtx.drawImage(
        image,
        cropArea.x, cropArea.y, cropArea.width, cropArea.height,
        0, 0, cropArea.width, cropArea.height
      );

      // Convert to blob
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          onSave(blob);
        }
        setIsLoading(false);
      }, 'image/jpeg', 0.9);
    } catch (error) {
      console.error('Error saving image:', error);
      setIsLoading(false);
    }
  };

  const resetCrop = () => {
    const image = imageRef.current;
    if (!image) return;

    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    const size = Math.min(image.naturalWidth, image.naturalHeight) * 0.8;
    
    setCropArea({
      x: centerX - size / 2,
      y: centerY - size / 2,
      width: size,
      height: size
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">تحرير الصورة</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Image Editor */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="relative flex items-center justify-center h-full">
            {/* Hidden image for loading */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Edit"
              className="hidden"
              onLoad={handleImageLoad}
            />

            {/* Canvas for editing */}
            {imageLoaded && (
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full border border-gray-300 cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ imageRendering: 'pixelated' }}
              />
            )}

            {!imageLoaded && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main"></div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              اسحب المنطقة المحددة لتحديد الجزء المراد قصه
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetCrop}
                className="flex items-center"
              >
                <ArrowPathIcon className="w-4 h-4 mr-2" />
                إعادة تعيين
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="text-gray-600"
              >
                إلغاء
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary-main hover:bg-primary-dark flex items-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <CheckIcon className="w-4 h-4 mr-2" />
                )}
                حفظ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
