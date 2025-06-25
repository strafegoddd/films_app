import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import structures from "../../data";
import BuildCard from "./BuildCard";

const cardData = [structures[3], structures[6], structures[9], structures[7]];

function Content() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {cardData.map((item, index) => (
          <Box key={index}>
            <BuildCard building={item} cardIndex={index} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Content;
