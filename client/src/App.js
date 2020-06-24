import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Login from './components/admin/Login'
import Register from './components/admin/Register'
import Main from './components/dashboard/Main'

import store from './store'
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import Print from './components/dashboard/Print'



if (localStorage.token) {
  setAuthToken(localStorage.token)
}




const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Fragment >
        <Router>
          <div className="nav">

          <Navbar/>
          </div>
          {/* <Route path="/print" component={Print} /> */}
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/main' component={Main} />
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
