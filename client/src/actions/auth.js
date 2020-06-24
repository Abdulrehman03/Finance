import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import {ToastsContainer, ToastsStore} from 'react-toasts';


//Load User
export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: "USER_LOADED",
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: "AUTH_ERROR"
        })
    }

}

//Check Payments 

export const checkPayments = () => async dispatch => {

    try {
        
        const res = await axios.put('/api/auth/check')
        dispatch({
            type: "CHECK_USERS",
            payload: res.data
        })


    } catch (err) {
        console.log(err.message);
    }

}


//Register User
export const register = ({ name, regNo, password, branch }) => async dispatch => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, regNo, password, branch });

    try {

        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        });

        dispatch(loadUser());
        // dispatch(checkPayments());
    } catch (err) {
        ToastsStore.error("Register Failed")

        const errors = err.response.data.errors
        console.log(errors)

        dispatch({
            type: "REGISTER_FAIL"
        })
    }

}

//Login User 

export const login = ({ regNo, password }) => async dispatch => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ regNo, password });

    try {

        const res = await axios.post('/api/auth', body, config);


        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });
        dispatch(loadUser());
        // dispatch(checkPayments());
    } catch (err) {

        const errors = err.response.data.errors
        console.log(errors)
        ToastsStore.error("Login Failed")

        dispatch({
            type: "LOGIN_FAIL"
        })
    }

}
//Logout User

export const logout = () => dispatch => {

    dispatch({
        type: "LOGOUT"
    })



}

