import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addInvestment, getClients } from '../../actions/client'
import PropTypes from 'prop-types'


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

const AddInvestment = ({ reg, addInvestment,getClients }) => {
    const classes = useStyles();

    const [formData, setFormData] = React.useState({
        regNo: reg,
        investment: '',
        plan: '',
        interest: ''
    });
    const { name, regNo, investment, plan } = formData


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        addInvestment(formData)
        getClients();
        console.log(formData)
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>
            <TextField id="standard-basic" label="Add Investment" name="investment"
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
            </Select><br />
            <Button type="submit">Add </Button>
        </form>
    );
}
AddInvestment.propTypes = {
    addInvestment: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    reg: state.client.searchedClient.regNo
})

export default connect(mapStateToProps, { addInvestment, getClients })(AddInvestment)
