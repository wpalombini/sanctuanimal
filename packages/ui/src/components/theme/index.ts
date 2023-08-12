import { createTheme } from '@mui/material';
import { blue, deepOrange, grey } from '@mui/material/colors';

const defaultTheme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: {
      default: grey[200],
    },
  },
});

export const theme = createTheme(defaultTheme, {
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
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: defaultTheme.spacing(2),
          },
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
