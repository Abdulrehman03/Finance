import React, { Fragment, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { pay } from '../../actions/client'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Print from './Print'


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));



const Payments = ({ paymentData, pay }) => {


    const [formData, setFormData] = useState({
        id: paymentData.client._id,
        installmentDate: paymentData.data.installmentDate,
        plan: paymentData.data.plan,
        interest: paymentData.client.interest,
        modelId: paymentData.data.modelId,
        method: '',
        chequeNo: null

    })
    const onClick = (e) => {
        console.log(formData)

        pay(formData)

        // window.print();
        console.log(formData)


    }
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const classes = useStyles();
    // const componentRef = useRef();
    return (
        <Fragment>

            <Container fixed>
                <div className="heading">
                    <Typography variant="h4" component="h2">Payment</Typography>
                    <br />
                    <br />
                    <br />
                    <TextField
                        id="standard-read-only-input"
                        label="Name"
                        defaultValue={paymentData.client.name}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        id="standard-read-only-input"
                        label="Plan"
                        defaultValue={paymentData.data.plan}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <span> </span>
                    <TextField
                        id="standard-read-only-input"
                        label="Interest"
                        defaultValue={paymentData.client.interest}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <br />
                    <br />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="method"
                        placeholder="Payment Method"
                        // value={"method"}
                        onChange={e => onChange(e)}


                    >
                        <MenuItem value={"CASH"}>CASH</MenuItem>
                        <MenuItem value={"CHEQUE"}>CHEQUE</MenuItem>

                    </Select>
                    <FormHelperText>Placeholder</FormHelperText>
                    <br />
                    {formData.method == "CHEQUE" &&
                        <TextField
                            id="standard-read-only-input"
                            label="Credit Card Number"
                            name="chequeNo"
                            value={formData.chequeNo}
                            onChange={e => onChange(e)}


                        />}
                    <br />

                    <br />
                    <Link> <Button onClick={e => onClick(e)} variant="contained" color="primary">PAY</Button></Link><br /><br />
                    <Link to="/main/print"> <Button variant="contained" color="primary">PRINT</Button></Link>
                    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
                </div>


            </Container>
        </Fragment>
    )
}



Payments.propTypes = {
    paymentData: PropTypes.object.isRequired,
    pay: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    paymentData: state.client.paymentData
})

export default connect(mapStateToProps, { pay })(Payments)
