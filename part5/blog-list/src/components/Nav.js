import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { clearUser } from '../reducers/userReducer';

const Nav = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            blog app
          </Typography>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>{' '}
          {loggedInUser && (
            <Button color="inherit" onClick={() => dispatch(clearUser())}>
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
