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
import Cropper from 'react-easy-crop';
import { MdCloudUpload } from 'react-icons/md';
import { useImageCropper } from '../../../../hooks/useImageCropper';

export const UploadAvatar = ({ userData, onSave, isPending }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
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
  } = useImageCropper(userData?.user);

  const handleSave = async () => {
    const croppedFile = await handleSaveCroppedImage();
    if (croppedFile && onSave) {
      onSave({ ...formData, file: croppedFile });
    }
  };

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
              onClick={handleSave}
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
