"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NAV_ITEMS = [
  { label: "All Notifications", href: "/" },
  { label: "Priority Inbox", href: "/priority" },
];

export function AppHeader() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const NavContent = () => (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={isMobile ? 0 : 1}
      sx={{
        width: isMobile ? "100%" : "auto",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.href}
          component={Link}
          href={item.href}
          onClick={isMobile ? handleDrawerToggle : undefined}
          sx={{
            color: isActive(item.href) ? "primary.main" : "text.secondary",
            borderBottom: isActive(item.href)
              ? "2px solid"
              : "2px solid transparent",
            borderColor: "primary.main",
            borderRadius: "0px",
            px: isMobile ? 2 : 1.5,
            py: isMobile ? 1.5 : 1,
            justifyContent: isMobile ? "flex-start" : "center",
            fontWeight: isActive(item.href) ? 600 : 500,
            fontSize: isMobile ? "1rem" : "0.95rem",
            transition: "all 200ms ease",
            "&:hover": {
              backgroundColor: isMobile ? "#f5f5f5" : "transparent",
              color: "primary.main",
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Stack>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px",
            px: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo & Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "primary.main",
            }}
          >
            <NotificationsIcon
              sx={{
                fontSize: "1.75rem",
              }}
            />
            <Box
              component="h1"
              sx={{
                margin: 0,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "text.primary",
              }}
            >
              Campus Notifications
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && <NavContent />}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: "text.primary" }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <Drawer
          anchor="top"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              marginTop: "64px",
              backgroundColor: "#ffffff",
              border: "none",
              borderBottom: "1px solid #e0e0e0",
            },
          }}
        >
          <Box
            sx={{
              py: 1,
            }}
          >
            <List disablePadding>
              {NAV_ITEMS.map((item) => (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={handleDrawerToggle}
                    selected={isActive(item.href)}
                    sx={{
                      borderLeft: isActive(item.href)
                        ? "4px solid"
                        : "4px solid transparent",
                      borderColor: "primary.main",
                      pl: 2,
                      py: 1.5,
                      backgroundColor: isActive(item.href)
                        ? "#f5f5f5"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      "& .MuiListItemText-root": {
                        "& .MuiTypography-root": {
                          fontWeight: isActive(item.href) ? 600 : 500,
                          color: isActive(item.href)
                            ? "primary.main"
                            : "text.primary",
                        },
                      },
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
}
