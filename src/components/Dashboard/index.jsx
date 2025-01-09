import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { FaBoxes, FaUsers, FaUsersSlash } from 'react-icons/fa';
import { getAllProdutos, getAllUsuarios } from '../../service/api';
import { useFormatNumber } from '../../utils/ConvertValues';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  BarElement,
  PointElement,
  LinearScale,
  LineElement
);

export const DashBoard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const { formatNumber } = useFormatNumber();

  const { data: produtosData } = useQuery({
    queryKey: ['produtos'],
    queryFn: () => getAllProdutos(null, 1),
  });
  const { data: usuariosData } = useQuery({
    queryKey: ['usuarios'],
    queryFn: () => getAllUsuarios(null, 1),
  });

  const totalUsersOffline = usuariosData
    ? usuariosData.totalUsers - usuariosData.totalUsersOnline
    : 0;

  const totalOnlineData = {
    labels: ['Online', 'Offline'],
    datasets: [
      {
        label: 'Qnt de Usuários',
        data: [usuariosData?.totalUsersOnline, totalUsersOffline],
        backgroundColor: ['#44b700', '#999999'],
        hoverOffset: 4,
      },
    ],
  };

  const totalClientsData = {
    labels: usuariosData?.estatisticas.map((item) => `${item.month}/${item.year}`),
    datasets: [
      {
        label: 'Total de Clientes cadastrados',
        data: usuariosData?.estatisticas.map((item) => item.count),
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        tension: 0.1,
        fill: false,
        pointBackgroundColor: '#3f51b5',
      },
    ],
  };

  return (
    <Box sx={{ width: '100%', paddingRight: 5 }}>
      <Grid
        container
        justifyContent="space-between">
        <Grid
          item
          xs={12}
          sm={6}
          md={3}>
          <Card sx={{ boxShadow: 'none', background: '#cfcfcf' }}>
            <CardContent>
              <Typography
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                variant="h6"
                gutterBottom>
                <FaBoxes style={{ fontSize: 25 }} />
                Total de Produtos
              </Typography>
              <Typography variant="h4">{formatNumber(produtosData?.totalProducts || 0)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}>
          <Card sx={{ boxShadow: 'none', background: '#cfcfcf' }}>
            <CardContent>
              <Typography
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                variant="h6"
                gutterBottom>
                <FaUsers style={{ fontSize: 25 }} />
                Total de Usuários
              </Typography>
              <Typography variant="h4">{formatNumber(usuariosData?.totalUsers || 0)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}>
          <Card sx={{ boxShadow: 'none', background: '#cfcfcf' }}>
            <CardContent>
              <Typography
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                variant="h6"
                gutterBottom>
                <FaUsersSlash style={{ fontSize: 25 }} />
                Usuarios Banidos
              </Typography>
              <Typography variant="h4">
                {formatNumber(usuariosData?.totalUsersBanned || 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, width: '100%' }}>
        <Grid
          container
          spacing={2}>
          <Grid
            item
            xs={12}
            md={6}>
            <Card
              sx={{
                width: isSmallScreen ? 300 : 400,
                height: isSmallScreen ? 450 : 550,
                boxShadow: 'none',
              }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom>
                  Status Online
                </Typography>
                {totalOnlineData ? <Doughnut data={totalOnlineData} /> : <CircularProgress />}
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}>
            <Card
              sx={{
                width: isSmallScreen ? 500 : 800,
                height: isSmallScreen ? 400 : 450,

                boxShadow: 'none',
              }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom>
                  Clientes Cadastrados
                </Typography>
                {totalClientsData ? <Line data={totalClientsData} /> : <CircularProgress />}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
