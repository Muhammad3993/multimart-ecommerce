import React from 'react'
// Components
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Routers from '../../routers/Routers'

const Layout = () => {
  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  )
}

export default Layout