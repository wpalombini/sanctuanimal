import { createTheme } from '@mui/material';
import { blue, deepOrange, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: {
      default: grey[200],
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
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderBottom: `solid 1px ${grey[300]}`,
        },
      },
    },
  },
});
