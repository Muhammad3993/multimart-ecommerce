import React, { useState } from 'react'
// components
import Helmet from '../components/helmet/Helmet'
// reactstrap
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
// react-router-dom
import { Link, useNavigate } from 'react-router-dom'
// css
import '../style/login.css'
// auth
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore'

import {auth} from '../firebase.config'
import { storage } from '../firebase.config'
import { db } from '../firebase.config'

import {toast} from 'react-toastify'


const SignUp = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signup = async(e) => {
    e.preventDefault()
      setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=> {
          // update user profile
          await updateProfile(user,{
            displayName: username,
            photoURL: downloadURL
          });
          // store user data in firestore database
          await setDoc(doc(db, 'users', user.uid),{
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL
          })
        })
      })

      setLoading(false)

      toast.success('Account created')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('smothing went wrong')
    }
  }

  return (
    <Helmet title='SignUp'>
      <section>
        <Container>
          <Row>
            {
              loading ? (<Col lg='12' className='text-center'>
                <h5 className='fw-bold'>Loading....</h5>
              </Col>) : 
              (<Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold mb-4'>SignUp</h3>
                <Form className='auth_form' onSubmit={signup}>
                  <FormGroup className='form_group'>
                    <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form_group'>
                    <input type="email" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form_group'>
                    <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form_group'>
                    <input type="file" onChange={e => setFile(e.target.files[0])}/>
                  </FormGroup>
                  <button className='buy_btn auth_btn' type='submit'>Create an Account</button>
                  <p>Already have  an account? <Link to='/login'>Login</Link></p>
                </Form>
              </Col>)
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default SignUp