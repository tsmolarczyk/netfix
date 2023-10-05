import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const theme = useTheme();

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <Box
      className="container"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Button
        sx={{ m: "30px 2px" }}
        variant="contained"
        color="primary"
        type="button"
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Typography
        variant="h4"
        sx={{
          m: "0px 20px !important",
          color: theme.palette.text.primary
        }}
      >
        {currentPage}
      </Typography>
      <Button
        sx={{ m: "30px 2px" }}
        variant="contained"
        color="primary"
        type="button"
        onClick={handleNext}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
