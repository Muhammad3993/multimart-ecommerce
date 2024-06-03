import React from 'react'
// reactstrap
import { Container } from 'reactstrap'
// css
import '../../style/common_section.css'

const CommonSection = ({title}) => {
  return (
    <section className='common_section'>
        <Container className='text-center'>
            <h1>{title}</h1>
        </Container>
    </section>
  )
}

export default CommonSection