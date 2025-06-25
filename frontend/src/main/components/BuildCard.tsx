import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1.5)
}));

interface ComponentProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };
  cardIndex: number;
}

function BuildCard({ building, cardIndex }: ComponentProps) {
  const isEven = cardIndex % 2 === 0;

  return (
    <Card sx={{ 
        display: "flex", 
        flexDirection: isEven ? 'row' : 'row-reverse',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
      <CardMedia 
        component="img" 
        alt={building.title} 
        image={building.img}
        sx={{ 
          width: '45%',
          maxHeight: '350px',
          objectFit: 'contain',
          bgcolor: 'grey.50'
        }}
      />
      <Box sx={{ 
        width: '55%', 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {building.title}
          </Typography>
          {building.description.map((item, ind) => (
            <StyledTypography key={ind} variant="body2">
              {item}
            </StyledTypography>
          ))}
        </CardContent>
        <CardActions sx={{ justifyContent: isEven ? 'flex-end' : 'flex-start', mt: 'auto', p: 2 }}>
          <Button size="small" color="info" variant="contained">Подробнее</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default BuildCard;
