import { Box } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';

const LoadingSpinner: React.FC = () => {
  return (
    <Box width="100vw" height="100vh" display="flex">
      <CircularProgress isIndeterminate color="green.300" margin="auto" />
    </Box>
  );
};

export default LoadingSpinner;
