import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
