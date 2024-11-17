import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { colors } from "../styles";

const PageLoader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress
        sx={{ color: `${colors.primary}` }}
        size={100}
        thickness={5}
      />
    </Box>
  );
};

export default PageLoader;
