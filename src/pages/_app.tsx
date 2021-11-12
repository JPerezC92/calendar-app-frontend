import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'src/modules/ui/theme';
import { CustomProviders } from 'src/modules/common/components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CustomProviders>
        <Component {...pageProps} />
      </CustomProviders>
    </ChakraProvider>
  );
}

export default MyApp;
