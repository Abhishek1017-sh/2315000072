"use client";

import { Container, Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        py: { xs: 3, sm: 4, md: 5 },
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="md">
        {/* Page Header */}
        <Box sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              fontWeight: 700,
              color: "text.primary",
              mb: 1,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              sx={{
                fontSize: "1rem",
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* Content */}
        {children}
      </Container>
    </Box>
  );
}
