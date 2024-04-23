import { Box, CircularProgress, Typography } from "@mui/material";

function LoadingResults() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
          Aguarde... calculando
        </Typography>
      </Box>
    </>
  );
}

export default LoadingResults;
