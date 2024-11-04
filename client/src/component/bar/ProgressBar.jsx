// src/components/LinearProgressWithLabel.jsx
import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ProgressBar({value}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100px", mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

ProgressBar.propTypes = {
  value: 10
};

export default ProgressBar;
