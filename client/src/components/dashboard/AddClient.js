import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createClient } from '../../actions/client'
import { connect } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';



const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));


const AddClient = ({ createClient }) => {



    const classes = useStyles();

    const [formData, setFormData] = React.useState({
        name: '',
        regNo: '',
        investment: '',
        plan: '',
        interest: '',
        date: '',
        installments: []
    });
    const { name, regNo, investment, plan } = formData


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        createClient(formData);
        console.log(formData)
    }

    return (
        <Fragment>
            <br />
            <br />
            <a className="btn"><Link to="/main">Back</Link></a>
            <div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>
                    <TextField id="standard-basic" label="Name" name="name"
                        value={name}
                        onChange={e => onChange(e)} /><br />
                    <TextField id="standard-basic" label="RegNo" name="regNo"
                        value={regNo}
                        onChange={e => onChange(e)} /><br />
                    <TextField id="standard-basic" label="Investment" name="investment"
                        value={investment}
                        onChange={e => onChange(e)} /><br />

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="plan"
                        value={plan}
                        onChange={e => onChange(e)}
                    >
                        <MenuItem value={"Three Months"}>Three Months</MenuItem>
                        <MenuItem value={"Six Months"}>Six Months</MenuItem>
                        <MenuItem value={"1 Year"}>1 year</MenuItem>
                    </Select>
                    <br />
                    <Button type="submit">Add </Button>

                </form>
            </div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
        </Fragment>
    )
}

AddClient.propTypes = {
    createClient: PropTypes.func.isRequired,
}

export default connect(null, { createClient })(AddClient)
