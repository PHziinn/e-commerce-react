import { Box, Button, Grid2, Typography } from '@mui/material';

export const DescriptionProduct = ({ product }) => {
  return (
    <>
      <Box sx={{ border: 1, borderColor: 'divider', marginBottom: 2, mt: 10 }}>
        <Button
          sx={{
            marginLeft: 2,
            borderBottom: 4,
            borderColor: '#4169E1',
            color: '#4169E1',
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#4169E1',
            },
          }}>
          Detalhes técnicos
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          boxShadow: '0px 0px 3px 0px rgb(128 128 128 / 58%)',
          padding: 2,
          borderRadius: 1,
        }}>
        <Typography
          variant="body1"
          sx={{ marginBottom: 3, color: '#555' }}>
          {product?.description}
        </Typography>

        <Grid2
          container
          spacing={2}
          sx={{
            backgroundColor: '#EFF2F4',
            borderRadius: 1,
            padding: 2,
            overflow: 'hidden',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography
              sx={{
                padding: 1,
                fontWeight: 'bold',
                borderBottom: '1px solid #c1cddf',
                color: '#4169E1',
              }}>
              Modelo
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>
              Certificante
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>Tipo</Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>Tamanho</Typography>
          </Grid2>

          <Grid2
            size={{ xs: 12, md: 8 }}
            sx={{ backgroundColor: 'white' }}>
            <Typography
              sx={{
                padding: 1,
                borderBottom: '1px solid #c1cddf',
              }}>
              #87858867
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>
              {product?.sku}
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>
              {product?.name}
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>
              34mm x 450mm x 19mm
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
