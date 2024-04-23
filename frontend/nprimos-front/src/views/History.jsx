import {
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { theme } from "../theme/theme";
import { toast } from "react-toastify";

function History({
  isHistoryLoading,
  history,
  handleClearHistory,
  setShowHistory,
}) {
  return (
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
      <Paper elevation={3} sx={{ width: "100%", overflow: "hidden", mb: 2 }}>
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
                <Typography variant="subtitle1" sx={{ my: 2, color: "white" }}>
                  Histórico vazio...
                </Typography>
              )}
            </List>
          </Box>
        )}
      </Paper>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button variant="contained" fullWidth onClick={handleClearHistory}>
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
  );
}

export default History;
