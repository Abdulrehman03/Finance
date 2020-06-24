import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import {logout} from '../actions/auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const Navbar = ({ isAuthenticated ,logout}) => {
  const classes = useStyles();
  const log = (e) => {
   logout()
  }
  const login = (e) => {
    
  
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            Finance Company
            </Typography>
          {isAuthenticated && <Button onClick={e => log(e)} color="inherit">Logout</Button>}
          {!isAuthenticated && <Button onClick={e => login(e)} color="inherit"><Link to="/login">Login</Link></Button>}
          {!isAuthenticated && <Button color="inherit"><Link to="/register">SignUp</Link></Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = state => ({

  isAuthenticated: state.auth.isAuthenticated

})
export default connect(mapStateToProps,{logout})(Navbar);