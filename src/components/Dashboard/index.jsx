import React from 'react';
import { Typography, Card, CardContent, Grid2, Box } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Filler,
  LineElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

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
  // Dados simulados para os gráficos
  const totalStockData = {
    labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D'],
    datasets: [
      {
        label: 'Quantidade em Estoque',
        data: [50, 30, 20, 10],
        backgroundColor: ['#3f51b5', '#f50057', '#ff9800', '#4caf50'],
        borderWidth: 1,
      },
    ],
  };

  const totalClientsData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
    datasets: [
      {
        label: 'Total de Clientes',
        data: [10, 150, 3000, 5000],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#3f51b5',
      },
    ],
  };

  const topProductsData = {
    labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D'],
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: [300, 250, 400, 150],
        backgroundColor: ['#4caf50', '#f50057', '#ff9800', '#3f51b5'],
      },
    ],
  };

  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <Box
          key={item}
          sx={{
            width: 300,
            height: 150,
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}>
          Card {item}
        </Box>
      ))}
      <Grid2
        container
        spacing={10}
        sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* Gráfico de Estoques */}
        <Grid2
          item
          xs={12}
          md={6}>
          <Card sx={{ width: 450, height: 600 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom>
                Totais de Estoques
              </Typography>
              <Doughnut data={totalStockData} />
            </CardContent>
          </Card>
        </Grid2>

        {/* Gráfico de Produtos Mais Vendidos */}
        <Grid2
          item
          xs={12}>
          <Card sx={{ width: 450, height: 600 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom>
                Produtos Mais Vendidos
              </Typography>
              <Bar
                data={topProductsData}
                options={{
                  indexAxis: 'y', // Transforma o gráfico em barras horizontais
                  responsive: true,
                }}
              />
            </CardContent>
          </Card>
        </Grid2>

        {/* Gráfico de Clientes */}
        <Grid2
          item
          xs={12}
          md={6}>
          <Card sx={{ width: 450, height: 300 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom>
                Totais de Clientes
              </Typography>
              <Line data={totalClientsData} />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  );
};
