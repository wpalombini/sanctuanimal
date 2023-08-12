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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          userSelect: 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
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
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
        fullWidth: true,
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
