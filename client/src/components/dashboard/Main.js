import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddClient from './AddClient'
import AllClients from './AllClients'
import EditClient from './EditClient'
import Print from './Print'
import History from './History'

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Payments from './Payments'

import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));


const Main = ({ isAuthenticated }) => {
    
    const onClick = () => {
        
        
        
    }
    
    const classes = useStyles();
    
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Router>
            <Fragment>
                <br />


                
                <Link to="/main/add"><Button id="mainButtons" onClick={e => onClick(e)} variant="contained" color="primary">Add Investor</Button></Link><span> </span>
                <Link to="/main/all"><Button id="mainButtons" onClick={e => onClick(e)} variant="contained" color="primary">Show Clients</Button></Link><span> </span>
                <Link to="/main/edit"><Button id="mainButtons" onClick={e => onClick(e)} variant="contained" color="primary">Search Clients</Button></Link>
                <Route path="/main/add" component={AddClient} />
                <Route path="/main/all" component={AllClients} />
                <Route path="/main/edit" component={EditClient} />
                <Route path="/main/pay" component={Payments} />
                <Route path="/main/history" component={History} />
                <Route path="/main/print" component={Print} />

            </Fragment>
        </Router>
    )
}

Main.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {})(Main);
