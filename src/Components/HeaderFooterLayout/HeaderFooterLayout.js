import React from 'react'
import Header from '../Header/Header'
import Ad from '../Advertisement/Ad'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function HeaderFooterLayout(props) {
  return (
    <div>
        <Header authButton={props.authButton}/>
        <Ad/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
