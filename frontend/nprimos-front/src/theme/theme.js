import { createTheme } from '@mui/material/styles';

const color = "#ffffff";
export const theme = createTheme({
  typography: {
    fontFamily: "'Exo 2', sans-serif",
  },
  palette: {
    mode: "dark",
    common: {
      white: "#ffffff",
    },
    primary: {
      main: "#0094FC",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
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

export const ToastsBG = "#1b1c23";
