import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1976d2',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#3d5afe',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
  export default theme;
