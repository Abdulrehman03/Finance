import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { checkPayments } from './auth'
import { ToastsContainer, ToastsStore } from 'react-toasts';


//Create Profile

export const createClient = (formData) => async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/auth/client', formData, config)
        ToastsStore.success("Investor Added")

        dispatch({
            type: "CREATE_CLIENT",
            payload: res.data
        })

    } catch (error) {
        ToastsStore.error("Already Exists")
        console.log(error.message)
    }
}

//Get All clients

export const getClients = (data) => async dispatch => {

    try {

        const res = await axios.get('/api/auth/getclients')
        dispatch({
            type: "SHOW_CLIENTS",
            payload: res.data
        })
        // dispatch(checkPayments());

    } catch (error) {
        console.log(error.message)
    }

}

//Get Searched Client

export const searchedClient = (formData) => async dispatch => {

    try {


        const res = await axios.post('/api/auth/edit', formData)
        dispatch({
            type: "SEARCHED_CLIENT",
            payload: res.data
        })

    } catch (err) {
        console.log(err.message)

    }

}

//Add Investment
export const addInvestment = (formData) => async dispatch => {
    try {
        const res = await axios.put('/api/auth/edit/add', formData);
        console.log(res.data)
        dispatch({
            type: "ADD_INVESTMENT",
            payload: res.data
        })

    } catch (err) {
        console.log(err.message)
    }
}

//Payment Data

export const paymentData = (data, client) => async dispatch => {
    let d = { data, client }
    dispatch({
        type: "PAYMENT_DATA",
        payload: d
    })
}


//Pay

export const pay = (formData) => async dispatch => {
    try {
        const res = await axios.put('/api/auth/payment', formData)
        console.log(res.data)
        dispatch({
            type: "PAY",
            payload: res.data,
            payload2:formData
        })
        ToastsStore.success("Interest Paid !!")
    } catch (error) {
        console.log(error.message);
        ToastsStore.error("Already Paid")
    }

}

//History
export const history = (data) => async dispatch => {
    dispatch({
        type: "HISTORY",
        payload: data
    })
}