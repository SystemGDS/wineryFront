import {Grid} from "@mui/material"
import {GlobalStyles} from "@mui/styled-engine"

const useStyles = GlobalStyles(()=>({
    root:{
        flexGrow: 1
    }
}));
const Dashboard = () => {
    const classes = useStyles();
  return (
    <div className={classes.root}>
        <Grid container spacing> </Grid>
            <Grid item xs={2}>

            </Grid>
    </div>
  )
}

export default Dashboard