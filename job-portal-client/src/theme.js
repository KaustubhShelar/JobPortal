import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#3d5afe', // Light Blue
    },
    success: {
      main: '#2E7D32', // Green for Salary text
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body2: {
      color: "#555",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
          },
        },
      },
    },
  },
});

export default theme;
