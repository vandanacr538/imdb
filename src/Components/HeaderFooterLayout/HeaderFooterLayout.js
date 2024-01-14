import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function HeaderFooterLayout() {

  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
