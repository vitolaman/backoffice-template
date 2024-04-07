import { useEffect, useState } from "react";

const useImagePreview = (file?: string | File) => {
    const [imgSrc, setImgSrc] = useState<string>();
  
    useEffect(() => {
      const loadImage = async () => {
        if (file instanceof File) {
          try {
            const imageUrl = URL.createObjectURL(file);
            setImgSrc(imageUrl);
          } catch (error) {
            console.error('Error loading image:', error);
          }
        } else if (typeof file === 'string') {
          setImgSrc(file);
        } else {
          setImgSrc(undefined);
        }
      };
  
      loadImage();
  
      return () => {
        if (imgSrc) {
          URL.revokeObjectURL(imgSrc);
        }
      };
    }, [file]);
  
    return imgSrc;
  };
  
  export default useImagePreview;
  