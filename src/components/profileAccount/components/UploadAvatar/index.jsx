import { Avatar, Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';

export const UploadAvatar = ({ userData, onSave }) => {
  const usuario = userData?.user;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState(usuario);
  const [preview, setPreview] = useState(userData?.user.avatar);
  const [isNewImage, setIsNewImage] = useState(false);

  useEffect(() => {
    setFormData(usuario);
    setPreview(usuario?.avatar);
    setIsNewImage(false);
  }, [usuario]);

  const handleSave = () => {
    if (onSave && formData) {
      onSave(formData);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar: imageUrl,
      file: file,
    }));
    setPreview(imageUrl);
    setIsNewImage(true);
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
    setPreview(usuario?.avatar);
    setIsNewImage(false);
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
        <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
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
            sx={{
              boxShadow: 'none',
              color: 'white',
              background: 'black',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              width: '8rem',
              '&:hover': {
                backgroundColor: '#282828',
                color: 'white',
                boxShadow: 'none',
              },
            }}
            onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      )}
    </Box>
  );
};
