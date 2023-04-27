import { createTheme } from '@mui/material';
import { blue, deepOrange } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: {
      default: '#eee',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});
