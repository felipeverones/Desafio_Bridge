import { Box, Button, TextField, Typography } from "@mui/material";
import { theme } from "../theme/theme";

function MainView({ inputValue, handleChange, handleSubmit, setShowHistory }) {
  return (
    <>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          color: theme.palette.primary.main,
          textAlign: "justify",
        }}
      >
        Já se perguntou quantos números primos existem até 1000? E até 10000?
        Pois suas dúvidas acabaram! Com o{" "}
        <span style={{ color: "white", fontWeight: "bold" }}>
          Contador de Números Primos
        </span>
        , você só precisa digitar um número inteiro positivo entre 2 e um milhão
        no campo abaixo e vamos descobrir para você quantos números primos
        menores que ele existem!
      </Typography>
      <Box
        width={500}
        gap={0}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ mt: 4, mb: 2, maxWidth: "50%" }}
      >
        <TextField
          fullWidth
          label="Digite um número"
          value={inputValue}
          onChange={handleChange}
          variant="outlined"
          type="text"
          sx={{ borderRadius: "20%" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!inputValue}
          sx={{ mt: 2, mb: 8 }}
          onClick={handleSubmit}
        >
          Calcular
        </Button>
        <Button variant="contained" onClick={() => setShowHistory(true)}>
          Ver Histórico
        </Button>
      </Box>
    </>
  );
}

export default MainView;
