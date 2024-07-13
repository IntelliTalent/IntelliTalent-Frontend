import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function InfoCard({
  title,
  description,
  image,
  link,
}: {
  title: string;
  description: string;
  image: string;
  link?: string;
}) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ minHeight: 200, maxHeight: 200 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        {link && (
          <Box sx={{ width: "fit-content", ml: "auto" }}>
            <Link to={link} target="_blank">
              <Typography
                mt={2}
                color={"info.main"}
                sx={{
                  cursor: "pointer",
                  border: "1px solid",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                Download Extension
              </Typography>
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
