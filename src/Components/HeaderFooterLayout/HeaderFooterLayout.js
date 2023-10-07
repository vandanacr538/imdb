import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function HeaderFooterLayout(props) {
  return (
    <div>
        <Header authButton={props.authButton}/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
