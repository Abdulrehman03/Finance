

const initialState = {
    client: null,
    allClients: [],
    searchedClient: null,
    searched: false,
    paymentData: null,
    paymentMethod: null,
    chequeNo: null

}

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case "CREATE_CLIENT":

            state.allClients.push(payload.client)
            return {
                ...state,

                client: payload,
            }

        case "SHOW_CLIENTS":
        case "CHECK_USERS":
            // console.log(payload)
            return {
                ...state,
                allClients: payload
            }
        case "ADD_INVESTMENT":
            let ind
            for (let i = 0; i < state.allClients.length; i++) {
                if (state.allClients[i]._id == payload._id) {
                   ind= i
                }
            }
            state.allClients[ind]= payload

            return {
                ...state,
                allClients:state.allClients,
                searchedClient: payload
                
            }

        case "SEARCHED_CLIENT":
            console.log(payload)
            return {
                ...state,
                searchedClient: payload,
                searched: true
            }

        case "PAYMENT_DATA":
            console.log(payload);
            return {
                ...state,
                paymentData: payload
            }
        case "PAY":
            let index;
            for (let i = 0; i < state.allClients.length; i++) {
                if (state.allClients[i]._id == state.paymentData.client._id) {
                    index = i;
                }
            }
            state.allClients[index] = payload

            return {
                ...state,
                allClients: state.allClients,
                client: payload,
                paymentMethod: action.payload2.method,
                chequeNo: action.payload2.chequeNo
            }
        case "HISTORY":
            console.log(payload)
            return {
                ...state,
                client: payload
            }

        default:
            return state

    }
}