import React, { useState, useEffect, useRef } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { login } from '../Config/Myservice'

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function Login() {
    const [errors, setError] = useState({ err_email: '', err_pass: '' })
    const email = useRef('')
    const password = useRef('')
    const navigate = useNavigate('')

    //validation
    const handler = (event) => {
        const name = event.target.name;

        switch (name) {
            case 'email':
                const e_email = regForEmail.test(email.current.value) ? '' : 'Email-id is not valid';
                setError({ err_email: e_email })
                break;
            case 'password':
                const e_pass = password.current.value.length < 8 ? 'Password should be 8 char long' : '';
                setError({ err_pass: e_pass })
            default:
                break;
        }
    }

    //Check Login Credentials
    const addUser = (event) => {
        event.preventDefault();
        let data = { email: email.current.value, password: password.current.value }

        login(data).
            then(res => {
                if (res.data.err == 0) {
                    console.log(res.data)
                    localStorage.setItem("_token", res.data.token);
                    sessionStorage.setItem("user", email.current.value)
                    navigate('/home')
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })
    }

    return (
        <>
            <Container fluid className={styles.loginBackground}>
                <Row>
                    <Col sm={4} md={4} lg={4}></Col>
                    <Col sm={4} md={4} lg={4}>
                        <Row style={{ textAlign: "center", marginTop: "30px" }}>
                            <h3>Invoice Application</h3>
                            <h4 className="my-3 mb-3">Login to countinue....</h4>
                        </Row>
                        <Form method="post" onSubmit={addUser} style={{ height: "250px" }}>

                            <hr style={{ border: "1px solid red" }} />
                            <Form.Group className="mb-3" >
                                <Form.Label>Email address*</Form.Label>
                                <Form.Control type="text" name="email" id="email" ref={email} onChange={handler} placeholder="Enter email id" size="md" />
                                <span style={{ color: 'red' }}>{errors.err_email}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password*</Form.Label>
                                <Form.Control type="password" name="password" id="pass" onChange={handler} ref={password} placeholder="Enter password" />
                                <span style={{ color: 'red' }}>{errors.err_pass}</span>
                            </Form.Group>
                            <Row>
                                <Col sm={12} md={12} lg={12}>
                                    <div style={{ textAlign: "center" }}>
                                        <Button className="btn btn-danger" type="submit">
                                            Submit
                                        </Button>
                                    </div>

                                </Col>
                                {/* <Col sm={6} md={6} lg={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <Button variant="btn btn-secondary" ><Link to="/" style={{ textDecoration: "none", color: "white" }}>Back</Link></Button>

                                    </div>
                                </Col> */}
                            </Row>
                        </Form>
                        <Row>
                            <p>Don't have acoount?<Link to="/register" class={styles.link}>Click here</Link></p>
                        </Row>
                    </Col>
                    <Col sm={4} md={4} lg={4}></Col>
                </Row>


            </Container>
        </>
    )
}
