import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@styles/theme';
import { FC } from 'react';

const Providers: FC<{}> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
