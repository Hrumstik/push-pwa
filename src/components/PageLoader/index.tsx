import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useMixpanel } from "react-mixpanel-browser";
import { useEffect } from "react";
import { colors } from "../styles";

const PageLoader = () => {
  const mixpanel = useMixpanel();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const pwaLink = localStorage.getItem("pwaLink");
      if (pwaLink) {
        if (mixpanel) {
          mixpanel.track("pwa_openPage", { pwaLink });
        }
        window.location.href = pwaLink;
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [mixpanel]);

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
