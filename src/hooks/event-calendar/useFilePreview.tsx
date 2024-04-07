import { useEffect, useState } from "react";

const useFilePreview = (file?: File) => {
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    if (file instanceof File) {
      const newUrl = URL.createObjectURL(file);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
  }, [file]);

  return [imgSrc];
}

export default useFilePreview;