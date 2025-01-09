import { useCallback, useEffect, useState } from 'react';

export const useImageCropper = (initialData) => {
  const [formData, setFormData] = useState(initialData || {});
  const [preview, setPreview] = useState(initialData?.avatar || initialData?.image || '');
  const [isNewImage, setIsNewImage] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropAreaPixels, setCropAreaPixels] = useState(null);

  useEffect(() => {
    setFormData(initialData || {});
    setPreview(initialData?.avatar || initialData?.image || '');
    setIsNewImage(false);
  }, [initialData]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    readFile(file).then((imageDataUrl) => {
      setImageSrc(imageDataUrl);
      setFormData((prev) => ({ ...prev, file }));
      setIsNewImage(true);
    });
  };

  const handleImageRemove = () => {
    if (formData.avatar || formData.image) {
      URL.revokeObjectURL(formData.avatar || formData.image);
    }

    setFormData((prev) => ({ ...prev, avatar: null, image: null, file: null }));
    setPreview(initialData?.avatar || initialData?.image || '');
    setIsNewImage(false);
  };

  const handleSaveCroppedImage = async () => {
    if (imageSrc && cropAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, cropAreaPixels);
        setPreview(croppedImage);
        const file = await dataUrlToFile(croppedImage, 'image.jpg');

        setFormData((prev) => ({ ...prev, avatar: croppedImage, image: croppedImage, file }));

        return file;
      } catch (error) {
        console.error('Erro ao recortar a imagem:', error);
      }
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCropAreaPixels(croppedAreaPixels);
  }, []);

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        } else {
          reject('Erro ao gerar o blob da imagem');
        }
      }, 'image/jpeg');
    });
  };

  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  };

  const dataUrlToFile = (dataUrl, filename) => {
    return fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => new File([blob], filename, { type: 'image/jpeg' }));
  };

  return {
    formData,
    preview,
    isNewImage,
    imageSrc,
    crop,
    zoom,
    setCrop,
    setZoom,
    handleImageUpload,
    handleImageRemove,
    handleSaveCroppedImage,
    onCropComplete,
  };
};
