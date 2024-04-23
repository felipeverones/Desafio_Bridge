import { setupAPI } from "./config/config.js";
import { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/exo-2/300.css";
import "@fontsource/exo-2/400.css";
import "@fontsource/exo-2/500.css";
import "@fontsource/exo-2/600.css";
import "@fontsource/exo-2/700.css";
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
import ResultDisplay from "./components/ResultDisplay.jsx";
import { theme, ToastsBG } from "./theme/theme.js";
import MainView from "./views/MainView.jsx";
import LoadingResults from "./components/LoadingResults.jsx";
import Results from "./components/Results.jsx";
import History from "./views/History.jsx";

setupAPI();

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
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
        style: {
          backgroundColor: ToastsBG,
        },
      });
    } catch (error) {
      toast.error(`${error.response.data.data}`, {
        style: {
          backgroundColor: ToastsBG,
        },
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

  const fetchHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const response = await axios.get(`/history`);

      setHistory(response.data.data);
      setIsHistoryLoading(false);
      toast.success(`${response.data.message}`, {
        style: {
          backgroundColor: ToastsBG,
        },
      });
    } catch (error) {
      toast.error("Falha ao carregar o histórico.", {
        style: {
          backgroundColor: ToastsBG,
        },
      });
      setIsHistoryLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await axios.delete(`/history`);
      setHistory([]);
      toast.success("Histórico limpo com sucesso!", {
        style: {
          backgroundColor: ToastsBG,
        },
      });
    } catch (error) {
      toast.error("Falha ao limpar o histórico.", {
        style: {
          backgroundColor: ToastsBG,
        },
      });
    }
  };

  useEffect(() => {
    if (showHistory) {
      fetchHistory(setHistory, setIsHistoryLoading);
    }
  }, [showHistory]);

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
                <MainView
                  inputValue={inputValue}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  setShowHistory={setShowHistory}
                />
              )}
              {isLoading && (
                <>
                  <LoadingResults />
                </>
              )}
              {result && (
                <Results
                  num={result.num}
                  count={result.count}
                  time={result.time}
                  handleReset={handleReset}
                />
              )}
            </>
          )}
          {showHistory && (
            <History
              isHistoryLoading={isHistoryLoading}
              history={history}
              handleClearHistory={handleClearHistory}
              setShowHistory={setShowHistory}
            />
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
