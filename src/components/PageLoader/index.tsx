import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect } from "react";

const PageLoader = ({
  pwaLink,
  allowPwaRedirect,
}: {
  pwaLink: string;
  allowPwaRedirect: boolean;
}) => {
  useEffect(() => {
    if (!allowPwaRedirect) return;
    window.location.href = pwaLink;
  }, [pwaLink, allowPwaRedirect]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress sx={{ color: `#047a56` }} size={100} thickness={5} />
    </Box>
  );
};

export default PageLoader;
