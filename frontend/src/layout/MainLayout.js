import React from "react";
import { Container, Box, Typography } from "@mui/material";

function MainLayout({ children }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          HRMS Dashboard
        </Typography>
        {children}
      </Box>
    </Container>
  );
}

export default MainLayout;