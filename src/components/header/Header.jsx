// use
import { useRef, useEffect } from 'react';
// redux
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
// reactstrap
import { Container, Row } from 'reactstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../firebase.config';
// css
import './header.css'
// framer-motion
import { motion } from 'framer-motion';
// img
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png'
import { toast } from 'react-toastify';

const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/shop',
    display: 'Shop'
  },
  {
    path: '/cart',
    display: 'Cart'
  },
]


const Header = () => {

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const profileActionRef = useRef(null)
  const navigate = useNavigate()
  const {currentUser} = useAuth()


  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop > 60 || document.documentElement.scrollTop > 60){
        headerRef.current.classList.add('sticky_header')
      }else{
        headerRef.current.classList.remove('sticky_header')
      }
    })
  }

  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Logged out')
      navigate('/home')
    }).catch(err => {
      toast.error(err.message)
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })

  const menuToggle = () => menuRef.current.classList.toggle('active_menu')
  
  const navigateToCart = () => {
    navigate('/cart')
  }

  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show_profileActions')

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className="no_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {
                  nav_links.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <NavLink to={item.path} className={(navClass) => navClass.isActive ? "nav_active" : ""} >{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav_icons">
              <span className='fav_icon'>
                <i className='ri-heart-line'></i>
                <span className='badge'>2</span>
              </span>
              <span className='cart_icon' onClick={navigateToCart}>
                <i className='ri-shopping-bag-line'></i>
                <span className='badge'>{totalQuantity}</span>
              </span>
              <div className='profile' >
                <motion.img whileTap={{scale: 1.2}} src={currentUser ? currentUser.photoURL : userIcon} onClick={toggleProfileActions} alt="" />
                <div className='profile_actions' ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser ? <span onClick={logout}>Logout</span> : 
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link to='/signup'>SignUp</Link>
                      <Link to='/login'>Login</Link>
                    </div>
                  }
                </div>
                {/* <p>{currentUser.displayName}</p> */}
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i className='ri-menu-line'></i>
                </span>
              </div>
            </div>

          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header;