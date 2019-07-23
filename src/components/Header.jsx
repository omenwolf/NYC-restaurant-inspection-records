import React, { Fragment } from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "teal"
  },
  text: {
    // BUG: not working
    fontSize: "h1.fontSize"
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <header>
      {/* TODO: change color of navbar */}
      {/* TODO: change font color */}
      {/* TODO: change font style */}
      {/* TODO: change font positioning */}
      <AppBar className={classes.root}>
        <Tabs className={classes.text}>
          <Grid container direction="row" lg={10} justify="center">
            <Grid
              container
              lg={4}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Link to="/">
                <Tab label="NYC Food Safety" />
              </Link>
            </Grid>
            <Grid
              container
              lg={6}
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Link to="/">
                <Tab label="Home" />
              </Link>
              <Link to="/search">
                <Tab label="Search" />
              </Link>
              <Link to="/report-violations">
                <Tab label="Report Violations" />
              </Link>
            </Grid>
          </Grid>
        </Tabs>
      </AppBar>
    </header>
  );
};

export default Header;
