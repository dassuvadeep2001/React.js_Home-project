import React from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Header from '../layout/header/header'
import Footer from '../layout/footer/footer'
import Home from '../component/home'

function Routing() {
  return (
    <Router>
      <Header/>
        <Routes>
            <Route path="" element={<Home/>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default Routing