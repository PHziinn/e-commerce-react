import { Box, Typography, Tabs, Tab, Grid } from '@mui/material';

export const ProductsInfo = () => {
  return (
    <>
      <Box sx={{ border: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs>
          <Tab
            sx={{
              marginLeft: 2,
              borderBottom: 4,
              borderColor: '#4169E1',
              color: '#4169E1',
              fontWeight: 'bold',
            }}
            label="Detalhes técnicos"
          />
        </Tabs>
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae eligendi nulla eos
          praesentium omnis dolore non, harum rerum, quia necessitatibus numquam consequatur hic
          laboriosam quaerat itaque saepe minima odio nihil? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Suscipit explicabo dignissimos dolorem blanditiis voluptate nostrum,
          doloribus similique dolor vel nesciunt placeat autem! Consectetur quod voluptatibus culpa
          dicta amet, odit qui.
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: '#EFF2F4',
            borderRadius: 1,
            padding: 2,
            overflow: 'hidden',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
          <Grid
            item
            xs={12}
            md={4}>
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
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            sx={{ backgroundColor: 'white' }}>
            <Typography
              sx={{
                padding: 1,
                borderBottom: '1px solid #c1cddf',
              }}>
              #87858867
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>
              ISO-898921212
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>
              Película de Vidro 3d
            </Typography>
            <Typography sx={{ padding: 1, borderBottom: '1px solid #c1cddf' }}>
              34mm x 450mm x 19mm
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
