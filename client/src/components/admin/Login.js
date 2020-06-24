import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {Redirect} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';



import { login, register } from '../../actions/auth'
import { connect } from 'react-redux'


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));


const Login = ({ login ,isAuthenticated}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({

        regNo: '',
        password: '',
        showPassword: false
    });
    const { regNo, password } = formData;

    // const handleChange = event => {
    //     setValue(event.target.value);
    // };
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        login(formData)
        console.log(formData)
    }

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    if(isAuthenticated){
        return <Redirect to="/main" />
    }

    return (
        <Fragment>
            <div className="container" >
                <Container maxWidth="sm">
                    <Card className={classes.root}>
                        <CardActionArea>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2"> Login Form </Typography>
                            </CardContent>
                            <form className={classes.root} noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>

                                <TextField
                                    id="standard-textarea"
                                    label="Registration Number"
                                    placeholder="Enter Registration Number"
                                    multiline
                                    name="regNo"
                                    value={regNo}
                                    onChange={e => onChange(e)}
                                /><br /><br />

                                <Input
                                    id="standard-adornment-password"

                                    placeholder="Enter Password"
                                    type={formData.showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    name="password"
                                    onChange={e => onChange(e)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                /><br /><br /><br />
                                <Button type="submit">Login</Button>
                            </form>
                        </CardActionArea>

                    </Card>
                </Container>
            </div>
            <ToastsContainer store={ToastsStore}  position={ToastsContainerPosition.BOTTOM_CENTER}/>

        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
