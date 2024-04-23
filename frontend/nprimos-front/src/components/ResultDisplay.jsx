import { Typography } from '@mui/material';


const ResultDisplay = ({ num, count, time }) => (
  <div>
    <Typography variant='h6' sx={{ color: "white" }}>Números primos menores que {num}: {count}</Typography>
    <Typography variant='h6' sx={{ color: "white" }}>Calculado em: {time}ms</Typography>
  </div>
);

export default ResultDisplay;