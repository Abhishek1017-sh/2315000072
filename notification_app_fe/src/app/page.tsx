import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Notification App
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Campus notification platform
        </Typography>
      </Box>
    </Container>
  );
}
