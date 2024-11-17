import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { colors } from "../styles";

const PageLoader = ({ activePwaLink }: { activePwaLink: string }) => {
  return activePwaLink ? (
    <Box style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <iframe
        src={activePwaLink}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress
        sx={{ color: colors.primary }}
        size={100}
        thickness={5}
      />
    </Box>
  );
};

export default PageLoader;
