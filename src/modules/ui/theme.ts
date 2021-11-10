import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  refa: {
    100: '#16161D',
  },
};

const theme = extendTheme({
  colors: colors,
  config: config,
});

export default theme;
