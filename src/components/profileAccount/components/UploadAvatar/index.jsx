import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { MdCloudUpload } from 'react-icons/md';

export const UploadAvatar = ({ userData, onSave, isPending }) => {
  const usuario = userData?.user;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState(usuario);
  const [preview, setPreview] = useState(userData?.user.avatar);
  const [isNewImage, setIsNewImage] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropAreaPixels, setCropAreaPixels] = useState(null);

  useEffect(() => {
    setFormData(usuario);
    setPreview(usuario?.avatar);
    setIsNewImage(false);
  }, [usuario]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    readFile(file).then((imageDataUrl) => {
      setImageSrc(imageDataUrl);

      setFormData((prev) => ({
        ...prev,
        file: file,
      }));

      setIsNewImage(true);
    });
  };

  const handleImageRemove = () => {
    if (formData.avatar) {
      URL.revokeObjectURL(formData.avatar);
    }

    setFormData((prev) => ({
      ...prev,
      avatar: null,
      file: null,
    }));

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';

    setPreview(usuario?.avatar);
    setIsNewImage(false);
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCroppedImage = async () => {
    if (imageSrc && cropAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, cropAreaPixels);

        setPreview(croppedImage);
        const file = await dataUrlToFile(croppedImage, 'avatar.jpg');

        const updatedFormData = {
          ...formData,
          avatar: croppedImage,
          file: file,
        };

        if (onSave) {
          onSave(updatedFormData);
        }
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } catch (error) {
        console.error('Erro ao recortar a imagem:', error);
      }
    }
  };

  async function getCroppedImg(imageSrc, pixelCrop) {
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
  }

  function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });
  }

  function dataUrlToFile(dataUrl, filename) {
    return fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => new File([blob], filename, { type: 'image/jpeg' }));
  }

  return (
    <Box sx={{ marginTop: isMobile ? 25 : '10rem', mb: 4 }}>
      <Typography
        variant="h6"
        fontWeight="bold">
        Foto do perfil
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 2 }}>
        <Avatar
          src={preview}
          alt="User Avatar"
          sx={{ width: 120, height: 120 }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{
            boxShadow: 'none',
            background: '#000000',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            width: '12rem',
            '&:hover': {
              backgroundColor: '#282828',
              color: 'white',
              boxShadow: 'none',
            },
          }}
          startIcon={<MdCloudUpload />}>
          Upload Imagens
          <Box
            component={'input'}
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>
      {isNewImage && (
        <Box
          sx={{
            position: 'fixed',
            top: isMobile ? 75 : 0,
            left: 0,
            width: '100%',
            height: isMobile ? '700px' : '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            zIndex: 9999,
          }}>
          <Box
            sx={{
              position: 'relative',
              height: '80vh',
              width: '80vw',
              overflow: 'hidden',
              borderRadius: '7px',
            }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Box sx={{ mt: 1, width: '80%', maxWidth: 400 }}>
            <Typography
              variant="body1"
              align="center"
              color="black">
              Ajuste o zoom
            </Typography>
            <Slider
              sx={{ color: '#000000' }}
              size="small"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, value) => setZoom(value)}
              aria-labelledby="zoom-slider"
            />
          </Box>

          <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
            <Button
              onClick={handleImageRemove}
              sx={{
                boxShadow: 'none',
                color: 'white',
                background: '#bf2a1f',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                width: '8rem',
                '&:hover': {
                  backgroundColor: '#a11f15',
                  boxShadow: 'none',
                },
              }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveCroppedImage}
              sx={{
                boxShadow: 'none',
                color: 'white',
                background: 'black',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                width: '8rem',
                '&:hover': {
                  backgroundColor: '#282828',
                  boxShadow: 'none',
                },
              }}>
              {isPending ? (
                <CircularProgress
                  sx={{
                    color: '#fff',
                  }}
                  size={24}
                />
              ) : (
                ' Salvar'
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
