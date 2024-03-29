import { Button, Grid, Card, Typography } from "@mui/material";
import Timer from "../components/Timer";
import RepCounter from "../components/RepCounter";
import {useRef} from "react";
import { setIsStarted } from '../features/exercise/exerciseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCanStart } from "../features/exercise/exerciseSlice";
import { useNavigate } from "react-router-dom";

const DummyTimer = () => {
  return (
    <Card>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item alignItems="center" style={{ marginTop: "2rem", marginBottom: "2rem"}}>
          <Typography variant="h6" align="center" sx={{paddingRight: "1rem", paddingLeft: "1rem"}}>Just be BOLD and aim for GOLD!</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default function AssessmentStart() {
  const dispatch = useDispatch();
  const calibrated = useSelector(selectIsCanStart);
  const navigate = useNavigate();
  const buttonRef = useRef(null)

  const clock = calibrated ? <Timer buttonRef={buttonRef}/> : <DummyTimer />;
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {clock}
      </Grid>
      <Grid item>
        <RepCounter />
      </Grid>
      <Grid item>
        <Button ref={buttonRef} variant="contained"
          style={{ backgroundColor: "#8B0000", color: "#FFFFFF" }}
          onClick={() => {
            dispatch(setIsStarted(false));
            navigate('/assessmentend');
          }}>Stop</Button>
      </Grid>
    </Grid>
  )
}