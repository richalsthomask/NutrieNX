import React                       from 'react'
import './App.css'
import { BrowserRouter as Router,
         Switch,
          Route }                  from 'react-router-dom'
import Login                       from './Components/pages/Login'
import Register                    from './Components/pages/register'
import Homepage                    from './Components/pages/homepage'
import Tests                       from './Components/pages/tests'
import Adminlogin                  from './Components/pages/adminlogin'

function App() {


  return (

    <Router >

      <Switch >


        <Route
          path="/login"
          component={Login} />

        <Route
          path="/register"
          component={Register} />

        <Route
          path="/homepage"
          component={Homepage} />
       
        <Route
          path="/adminlogin"
          component={Adminlogin} />

      </Switch>


    </Router>


  )
}


export default App;