import {useState} from 'react';
import { Button, Dialog, Grid, Typography } from '@mui/material';
import Countdown from './Countdown';
import { setIsStarted } from "../features/exercise/exerciseSlice";
import { useDispatch } from 'react-redux';

export default function CountdownButton() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSkip = () => {
    dispatch(setIsStarted(true));
    handleClose();
  }

  return (
    <div>
      <Button variant="contained" sx={{ backgroundColor: "#19a119", color: "#FFFFFF" }} onClick={handleClickOpen}>
        Start
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container spacing={2} direction="column" alignItems="center"
          sx={{ paddingRight: "4rem", paddingLeft: "4rem", paddingBottom: "2rem", paddingTop: "2rem" }}>
          <Grid item>
            <Typography variant="h4">
              Starting In...
            </Typography>
          </Grid>
          <Grid item>
            <Countdown handleClose={handleClose} />
          </Grid>
          <Grid item sx={{paddingTop: "1rem"}}>
            <Button variant="contained" sx={{ backgroundColor: "#555555", color: "#FFFFFF"}} onClick={handleSkip}>
              Skip
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
