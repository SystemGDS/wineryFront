import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProductCard(props) {
  return (
    <Card sx={{ minWidth: 275, margin: 1 }}>
      <CardContent>
        <img src={props.image} height="200px" width="100%" overflow="hidden" />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ID: {props.id}
        </Typography>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Description: {props.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Stock: {props.stock}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: ${props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ width: "100%" }} onClick={props.onClose}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}
