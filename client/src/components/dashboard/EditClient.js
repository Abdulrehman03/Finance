import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { searchedClient } from '../../actions/client'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import AddInvestment from './AddInvestment'







const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));



const EditClient = ({ searchedClient, searched, client }) => {
    const classes = useStyles();


    const [formData, setFormData] = React.useState({

        regNo: '',

    });
    const { regNo } = formData


    const onChange = e => setFormData({ ...formData, "regNo": e.target.value });
    const onSubmit = e => {
        e.preventDefault()
        searchedClient(formData)
        console.log(formData)
    }

    return <Router>
        <Fragment>
            <br />
            <br />
            <Paper component="form" className={classes.root}>

                <InputBase
                    className={classes.input}
                    placeholder="Search Registration Number"
                    value={regNo}
                    onChange={e => onChange(e)}

                />
                <IconButton type="submit" className={classes.iconButton} onClick={e => onSubmit(e)} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />

            </Paper>
            <div>
                {searched && <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {client.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Investment : {client.investment}
                        </Typography>
                        {/* <Typography className={classes.pos} color="textSecondary">
                            Plan : {client.model.plan}
                        </Typography> */}
                        <Typography variant="body2" component="p">
                            Interest : {client.interest}
                            <br />

                        </Typography>
                    </CardContent>
                    <CardActions>
                       <Link to="/main/edit/add"><Button size="large">Add Investment</Button></Link> 
                    </CardActions>
                </Card>}
        <Route path="/main/edit/add" component={AddInvestment}  />
            </div>
        </Fragment>
    </Router >


}

EditClient.propTypes = {
    searchedClient: PropTypes.func.isRequired,
    searched: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    searched: state.client.searched,
    client: state.client.searchedClient
})

export default connect(mapStateToProps, { searchedClient })(EditClient) 
