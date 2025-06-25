import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: "8px 12px",
}));

interface ComponentProps {
  active: string;
}

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        mt: "28px",
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography variant="h6" sx={{ color: "#5d8aa8" }}>
            Топ фильмов IMDB
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Link to="/">
              <Button
                variant={active === "1" ? "contained" : "text"}
                color="info"
                size="medium"
              >
                Главная
              </Button>
            </Link>

            <Link to="/list">
              <Button
                variant={active === "2" ? "contained" : "text"}
                color="info"
                size="medium"
              >
                Список фильмов
              </Button>
            </Link>
            <Link to="/chart">
              <Button
                variant={active === "3" ? "contained" : "text"}
                color="info"
                size="medium"
              >
                Диаграммы
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Link to="/">
                  <MenuItem
                    selected={active === "1"}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "info.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "info.dark",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "info.light",
                        color: "info.contrastText",
                      },
                    }}
                  >
                    Главная
                  </MenuItem>
                </Link>
                <Link to="/list">
                  <MenuItem
                    selected={active === "2"}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "info.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "info.dark",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "info.light",
                        color: "info.contrastText",
                      },
                    }}
                  >
                    Список зданий
                  </MenuItem>
                </Link>
                <Link to="/chart">
                  <MenuItem
                    selected={active === "3"}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "info.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "info.dark",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "info.light",
                        color: "info.contrastText",
                      },
                    }}
                  >
                    Контакты
                  </MenuItem>
                </Link>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
