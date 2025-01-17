import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid2,
  Slider,
  Switch,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { MdDelete } from 'react-icons/md';
import { SwiperSlide } from 'swiper/react';
import { AlertNotification } from '../../../components/AlertNotification';
import { PainelAdministrativo } from '../../../components/layout/painelAdministrativo';
import { SliderCard } from '../../../components/Slide';
import { useAlert } from '../../../hooks/useShowAlert';
import { getAllSettings, patchSettings } from '../../../service/api';

const settings = {
  spaceBetween: 10,
  slidesPerView: 'auto',
  pagination: { clickable: true },
};

export const AdminSettings = () => {
  const [formData, setFormData] = useState({
    files: [],
    imagens: [],
  });

  const [feedMessage, setFeedMessage] = useState();
  const { alert, closeAlert, showAlert } = useAlert();
  const client = useQueryClient();
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMoitore = useMediaQuery('(min-width: 1024px) and (max-width: 1366px)');

  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getAllSettings,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const editSettingsMutation = useMutation({
    mutationFn: ({ id, dataSettings }) => patchSettings(id, dataSettings),
    onSuccess: () => {
      client.invalidateQueries(['settings']);
      showAlert('Configurações atualizada com Sucesso!', 'success');
    },
    onError: () => {
      showAlert('Erro ao atualizar configurações.', 'error');
    },
  });

  const handleSwitchChange = (key, value) => {
    const id = data?.[0]?.id;
    if (id) {
      editSettingsMutation.mutate({ id, dataSettings: { [key]: value } });
    }
  };

  const handleFeedMessageSave = () => {
    const id = data?.[0]?.id;
    if (id) {
      editSettingsMutation.mutate({ id, dataSettings: { message: feedMessage } });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file);
      setCropDialogOpen(true);
    } else {
      showAlert('Por favor, selecione uma imagem de até 5MB.', 'error');
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = async () => {
    if (!selectedFile || !croppedAreaPixels) return;

    const image = await createImage(URL.createObjectURL(selectedFile));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const { width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      width,
      height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], selectedFile.name, {
          type: 'image/png',
        });
        resolve(croppedFile);
      }, 'image/png');
    });
  };

  const handleCropConfirm = async () => {
    const croppedFile = await getCroppedImage();

    if (croppedFile) {
      const imagens = URL.createObjectURL(croppedFile);
      setFormData((prev) => ({
        ...prev,
        files: [...prev?.files, croppedFile],
        imagens: [...prev?.imagens, { bannerUrl: imagens }],
      }));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setCropDialogOpen(false);
    setSelectedFile(null);
  };

  const handleCropCancel = () => {
    setCropDialogOpen(false);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
      imagens: prev.imagens.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    const id = data?.[0]?.id;
    const formDataToSend = new FormData();

    formData.files.forEach((file) => {
      formDataToSend.append('files', file);
    });

    if (formData.feedMessage) {
      formDataToSend.append('message', formData.feedMessage);
    }

    if (id) {
      editSettingsMutation.mutate({
        id,
        dataSettings: formDataToSend,
      });
    }
  };

  async function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PainelAdministrativo>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <AlertNotification
          closeAlert={closeAlert}
          alert={alert}
        />
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold' }}>
          Configurações
        </Typography>

        <Box>
          <Box sx={{ mt: 5 }}>
            <Box sx={{ mb: 5 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                Imagens do Produto
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                <SliderCard
                  settings={settings}
                  style={{ width: '100%', height: 'auto' }}>
                  <Grid2
                    container
                    spacing={2}>
                    {(formData?.imagens.length > 0 ? formData.imagens : data?.[0]?.imagens)?.map(
                      (image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image.bannerUrl || data?.[0]?.imagens?.[index]?.url}
                            alt={`uploaded-img-${index}`}
                            style={{ width: '100%', height: 'auto', objectFit: 'scale-down' }}
                          />
                          <Button
                            variant="contained"
                            onClick={() => handleImageRemove(index)}
                            sx={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                              minWidth: 'unset',
                              padding: '5px',
                              borderRadius: '50%',
                              backgroundColor: 'red',
                            }}>
                            <MdDelete size={25} />
                          </Button>
                        </SwiperSlide>
                      )
                    )}

                    {/* {formData?.imagens?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image.bannerUrl}
                          alt={`uploaded-img-${index}`}
                          style={{ width: '100%', height: 'auto', objectFit: 'scale-down' }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => handleImageRemove(index)}
                          sx={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            minWidth: 'unset',
                            padding: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                          }}>
                          <MdDelete size={25} />
                        </Button>
                      </SwiperSlide>
                    ))} */}
                  </Grid2>
                </SliderCard>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    mb: 2,
                    backgroundColor: 'black',
                    boxShadow: 'none',
                    '&:hover': { backgroundColor: '#282828', boxShadow: 'none' },
                  }}>
                  Upload Imagens
                  <Box
                    component={'input'}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    mb: 2,
                    backgroundColor: 'black',
                    boxShadow: 'none',
                    '&:hover': { backgroundColor: '#282828', boxShadow: 'none' },
                  }}
                  onClick={handleSubmit}>
                  Salvar Banner
                </Button>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
              Manutenção do E-commerce
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={data?.[0]?.isManutencion || false}
                  onChange={(e) => handleSwitchChange('isManutencion', e.target.checked)}
                  color="primary"
                />
              }
              label="Ativar Manutenção do Site"
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Feed de Anúncio</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={data?.[0]?.isFeedDesconto || false}
                  onChange={(e) => handleSwitchChange('isFeedDesconto', e.target.checked)}
                  color="primary"
                />
              }
              label="Ativar Feed de Anúncio"
            />

            <Box>
              <TextField
                margin="normal"
                label="Mensagem"
                name="message"
                value={feedMessage || data?.[0].message}
                onChange={(e) => setFeedMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    width: '450px',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  },
                }}
              />
              <Box sx={{ mt: 2 }}>
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
                  onClick={handleFeedMessageSave}>
                  Salvar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {cropDialogOpen && (
        <Dialog
          open={cropDialogOpen}
          onClose={handleCropCancel}
          fullWidth
          maxWidth="ls">
          <DialogTitle>Recortar Imagem</DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 500,
                borderRadius: '7px',
                backgroundColor: 'transparent',
              }}>
              <Cropper
                image={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                crop={crop}
                zoom={zoom}
                cropSize={{ width: isMoitore ? 900 : 1200, height: isMoitore ? 375 : 500 }}
                aspect={12 / 5}
                restrictPosition={false}
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Box
              sx={{
                width: '80%',
                maxWidth: 400,
              }}>
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
                min={0}
                max={3}
                step={0.1}
                onChange={(e, value) => setZoom(value)}
                aria-labelledby="zoom-slider"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCropCancel}
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
              onClick={handleCropConfirm}
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
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </PainelAdministrativo>
  );
};
