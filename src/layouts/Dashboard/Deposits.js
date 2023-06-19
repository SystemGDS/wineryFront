import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import s from "./dashBoardComponent.module.css";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <div className={s.dashTitless}>
      <React.Fragment>
        <Title>
          • <u>Total Sales</u>
        </Title>
        <Typography component="p" variant="h4">
          $3,024.00
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on 15 March, 2019
        </Typography>
      </React.Fragment>
    </div>
  );
}
