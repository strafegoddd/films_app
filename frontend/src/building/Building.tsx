import { Box, Container, Typography, Breadcrumbs } from "@mui/material";
import structures from "../data";
import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";

const Building = () => {
  const { id } = useParams();
  const buildingIndex = id ? parseInt(id) : 0;
  const building = structures[buildingIndex];

  if (!building) {
    return (
      <div>
        <Navbar active="1" />
        <Container>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Здание не найдено
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={{ mt: 2, color: "#0078D4" }}>
              Вернуться на главную
            </Typography>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar active="1" />
      <Container>
        <Box sx={{ my: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#0078D4",
              }}
            >
              ГЛАВНАЯ
            </Link>
            <Typography color="text.primary">{building.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            my: 4,
          }}
        >
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 50%" },
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Box
              component="img"
              src={building.img}
              alt={building.title}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
                boxShadow: 1,
              }}
            />
          </Box>

          <Box
            sx={{
              flex: { xs: "1", md: "0 0 50%" },
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                mb: 3,
              }}
            >
              {building.title}
            </Typography>

            {building.description.map((paragraph, idx) => (
              <Typography
                key={idx}
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textAlign: "justify",
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Building;
