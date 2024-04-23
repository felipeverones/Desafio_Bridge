import { Box, Button } from "@mui/material";
import ResultDisplay from "./ResultDisplay";

function Results({ num, count, time, handleReset }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResultDisplay num={num} count={count} time={time} />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleReset}
      >
        Calcular novamente
      </Button>
    </Box>
  );
}

export default Results;
