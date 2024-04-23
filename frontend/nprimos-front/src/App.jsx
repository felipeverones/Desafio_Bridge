import { setupAPI } from "./config.js";
import { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/exo-2/300.css";
import "@fontsource/exo-2/400.css"; // Peso normal 400.
import "@fontsource/exo-2/500.css";
import "@fontsource/exo-2/600.css";
import "@fontsource/exo-2/700.css"; // Peso bold 700.
import "@fontsource/exo-2/800.css";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ResultDisplay from "./components/ResultDisplay";


setupAPI();

const ToastsBG = "#1b1c23";
const color = "#ffffff";
const theme = createTheme({
  typography: {
    fontFamily: "'Exo 2', sans-serif",
  },
  palette: {
    mode: "dark",
    common: {
      white: "#ffffff",
    },
    primary: {
      main: "#0094FC", // Cor principal
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Ajuste conforme necessário
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Ajuste conforme necessário
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
  },
});

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  const fetchHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const response = await axios.get(`/history`);

      setHistory(response.data.data);
      setIsHistoryLoading(false);
      toast.success(`${response.data.message}`, {
        style:{
        backgroundColor: ToastsBG,
        }
      });
    } catch (error) {
      toast.error("Falha ao carregar o histórico.", {
        style:{
        backgroundColor: ToastsBG,
        }
      });
      setIsHistoryLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await axios.delete(`/history`);
      setHistory([]);
      toast.success("Histórico limpo com sucesso!", {
        style:{
        backgroundColor: ToastsBG,
        }
      });
    } catch (error) {
      toast.error("Falha ao limpar o histórico.", {
        style:{
        backgroundColor: ToastsBG,
        }
      });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    // só atualiza o estado se o valor for um número ou vazio:
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/primes?k=${parseInt(inputValue, 10)}`);
      const data = response.data;
      setResult({
        num: data.data.upperLimit,
        count: data.data.countPrimes,
        time: data.data.calculationTimeMs,
      });
      toast.success(`${data.message}`, {
        style:{
        backgroundColor: ToastsBG,
        }
      });
    } catch (error) {
      toast.error(`${error.response.data.data}`, {
        style:{
        backgroundColor: ToastsBG,
        }
      });
    } finally {
      setIsLoading(false);
      setInputValue("");
    }
  };

  const handleReset = () => {
    setResult(null);
    setInputValue("");
    toast.dismiss();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop 
          closeOnClick
          theme="dark"
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          limit={2}
        />
        <Container
          maxWidth="md"
          sx={{
            px: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!showHistory && (
            <>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.contrastText,
                  mt: 9,
                  mb: 3,
                }}
              >
                Contador de Números Primos
              </Typography>
              {!isLoading && !result && (
                <>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      textAlign: "justify",
                    }}
                  >
                    Já se perguntou quantos números primos existem até 1000? E
                    até 10000? Pois suas dúvidas acabaram! Com o{" "}
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      Contador de Números Primos
                    </span>
                    , você só precisa digitar um número inteiro positivo entre 2
                    e um milhão no campo abaixo e vamos descobrir para você
                    quantos números primos menores que ele existem!
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
                    <Button
                      variant="contained"
                      onClick={() => setShowHistory(true)}
                    >
                      Ver Histórico
                    </Button>
                  </Box>
                </>
              )}
              {isLoading && (
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
              )}
              {result && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ResultDisplay
                    num={result.num}
                    count={result.count}
                    time={result.time}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleReset}
                  >
                    Calcular novamente
                  </Button>
                </Box>
              )}
            </>
          )}

          {showHistory && (
            <>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.contrastText,
                  mt: 9,
                  mb: 3,
                }}
              >
                Histórico de Consultas
              </Typography>
              <Paper
                elevation={3}
                sx={{ width: "100%", overflow: "hidden", mb: 2 }}
              >
                {isHistoryLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <CircularProgress color="primary" />
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center">
                    <List sx={{ width: "fit-content" }}>
                      {history.length > 0 ? (
                        history.map((item, index) => (
                          <ListItem sx={{ textAlign: "center" }} key={index}>
                            <ListItemText primary={item.message} />
                          </ListItem>
                        ))
                      ) : (
                        <Typography
                          variant="subtitle1"
                          sx={{ my: 2, color: "white" }}
                        >
                          Histórico vazio...
                        </Typography>
                      )}
                    </List>
                  </Box>
                )}
              </Paper>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleClearHistory}
                  >
                    Limpar Histórico
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      setShowHistory(false);
                      toast.dismiss();
                    }}
                  >
                    Voltar
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
