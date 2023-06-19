import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OrderCard(props) {
  const products = props.products.map((product) => {
    return <div>{product.name}</div>;
  });

  return (
    <Card sx={{ minWidth: 275, margin: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.email}
        </Typography>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          ID: {props.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date: {props.date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Status: {props.status}
        </Typography>
        <Typography variant="body2">
          Products:
          {products}
          <br />
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
