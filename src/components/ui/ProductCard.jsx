import React from 'react'
// motion
import { motion } from 'framer-motion'
// css
import '../../style/product_card.css'
// reactstrap
import { Col } from 'reactstrap'
// react-router-dom
import { Link } from 'react-router-dom'
// toastify
import { toast } from 'react-toastify';
// redux
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice'


const ProductCard = ({ item }) => {

    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl
        }))
        toast.success('Product added succcessfully')
    }

    return (
        <Col lg='3' md='4' className='mb-2'>
            <div className='product_item'>
                <div className="product_img">
                    <motion.img whileHover={{ scale: .9 }} src={item.imgUrl} alt="" />
                </div>
                <div className='p-2 prodcut_info'>
                    <h3 className="product_name"><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
                    <span>{item.category}</span>
                </div>
                <div className="product_card_bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">${item.price}</span>
                    <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
                        <i className="ri-add-line"></i>
                    </motion.span>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard