// use
import { useState } from 'react'
// reactstrap
import { Container, Row, Col } from 'reactstrap'
// components
import Helmet from '../components/helmet/Helmet'
import CommonSection from '../components/ui/CommonSection'
import ProductsList from '../components/ui/ProductsList'
// css
import '../style/shop.css'

import products from '../assets/data/products'

const Shop = () => {

  const [productsData, setProductsData] = useState(products);


  const handleFilter = e => {
    const filterValue = e.target.value
    if(filterValue === 'sofa'){
      const filteredProducts = products.filter(item => item.category === 'sofa')

      setProductsData(filteredProducts)
    }
    if(filterValue === 'mobile'){
      const filteredProducts = products.filter(item => item.category === 'mobile')

      setProductsData(filteredProducts)
    }
    if(filterValue === 'chair'){
      const filteredProducts = products.filter(item => item.category === 'chair')

      setProductsData(filteredProducts)
    }
    if(filterValue === 'watch'){
      const filteredProducts = products.filter(item => item.category === 'watch')

      setProductsData(filteredProducts)
    }
    if(filterValue === 'wireless'){
      const filteredProducts = products.filter(item => item.category === 'wireless')

      setProductsData(filteredProducts)
    }
  } 

  const handleSearch =  e => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }

  return (
    <>
      <Helmet title='Shop'>
        <CommonSection title='Products' />
        <section >
          <Container>
            <Row>
              <Col lg='3' md='6'>
                <div className="filter_widget">
                  <select onChange={handleFilter}>
                    <option>Filter By Category</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </div>
              </Col>
              <Col lg='3' md='6' className='text-end'>
                <div className="filter_widget">
                  <select>
                    <option>Sort By</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </Col>
              <Col lg='6' md='12'>
                <div className="search_box">
                  <input type="text" placeholder='Search......' onChange={handleSearch}/>
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className='pt-0'>
          <Container>
            <Row>
              {
                productsData.length === 0? <h1 className='text-center fs-4'>No products are found!!!</h1> :
                <ProductsList data={productsData}/>
              }
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  )
}

export default Shop