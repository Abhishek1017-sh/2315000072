"use client";

import { Paper, Typography, Button } from "@mui/material";
import { PageContainer } from "@/components/layout";
import StarIcon from "@mui/icons-material/StarOutline";

export default function PriorityPage() {
  return (
    <PageContainer
      title="Priority Inbox"
      description="Important notifications and urgent updates that need your attention."
    >
      {/* Empty State */}
      <Paper
        sx={{
          p: { xs: 4, sm: 6, md: 8 },
          textAlign: "center",
          border: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        }}
      >
        <StarIcon
          sx={{
            fontSize: "4rem",
            color: "text.secondary",
            mb: 2,
            opacity: 0.5,
          }}
        />
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "text.primary",
            mb: 1,
          }}
        >
          No priority notifications
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "text.secondary",
            mb: 3,
          }}
        >
          Important and urgent notifications will appear here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "6px",
            px: 3,
            py: 1,
            fontWeight: 500,
          }}
        >
          View All
        </Button>
      </Paper>
    </PageContainer>
  );
}
