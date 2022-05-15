import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, TextField, Container, requirePropFactory } from '@material-ui/core';
import useStyles from './Components/styles';
import GuestHeader from './Components/GuestHeader';
import MemberHeader from './Components/MemberHeader';
import StartButton from './Components/StartButton';
import StopButton from './Components/StopButton';
import TimeInput from './Components/TimeInput';
import DifficultyInput from './Components/DifficultyInput';

const PushupsAssessment = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <MemberHeader />
        <Grid container
          alignItems="center"
          justify="center">
          <Grid item xs={9}>
            <Card className={classes.CameraFeedback}>
              <CardMedia
                className={classes.cardMedia}
                image="https://flabfix.com/wp-content/uploads/2019/05/Sit-Ups.gif"
                title="pushups"
              />
              <Grid container spacing={4} justify="center" style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                <Grid item>
                  <StartButton />
                </Grid>
                <Grid item>
                  <StopButton />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default PushupsAssessment;