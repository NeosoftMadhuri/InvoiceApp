import React, { useState, useRef } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'


export default function Product() {
    const [errors, setError] = useState({ err_fname: '', err_lname: '', err_uname: '', err_mobile: '', err_email: '', err_pass: '', err_cpass: '' })
    const Item_name = useRef();
    const Item_quant = useRef();
    const Item_price = useRef();
    const Item_disc = useRef();
    const handler = () => {

    }

    const addProduct = (event) => {
        event.preventDefault();
        console.log("add product here")
        let formdata = { Item_name: Item_name.current.value, Item_quant: Item_quant.current.value, Item_price: Item_price.current.value, Item_disc: Item_disc.current.value }
        console.log(formdata)
        // addproduct(formdata)
        //     .then(res => {
        //         console.log(res.data)
        //     })
    }
    return (
        <>
            <Container>
                <Row>
                    <h4>Add Product...</h4>
                </Row>
                <Row>
                   
                    <Form method="post" onSubmit={addProduct}>

                    <Row>
                            <Col sm={6} md={6} lg={6}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control type="text" name="item_name" onChange={handler} ref={Item_name} className="form-control" size="20" />
                                    <span style={{ color: 'red' }}>{errors.err_item_name}</span>
                                </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Item Quantity</Form.Label>
                                    <Form.Control type="number" name="Item_quant" ref={Item_quant} onChange={handler} className="form-control" size="20" />
                                    <span style={{ color: 'red' }}>{errors.err_ins_duedate}</span>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={6} lg={6}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Item Price Per Piece</Form.Label>
                                    <Form.Control type="number" name="Item_price" onChange={handler} ref={Item_price} className="form-control" size="20" />
                                    <span style={{ color: 'red' }}>{errors.err_item_price}</span>
                                </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Discount in %</Form.Label>
                                    <Form.Control type="number" name="Item_disc" ref={Item_disc} onChange={handler} className="form-control" size="20" />
                                    <span style={{ color: 'red' }}>{errors.err_ins_disc}</span>
                                </Form.Group>
                            </Col>
                        </Row>
                       
                        

                      

                       



                        <Row>
                            <Col sm={6} md={6} lg={6}>
                                <div style={{ textAlign: "center" }}>
                                    <Button type="submit" className="btn btn-primary mb-3">Submit</Button>
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div style={{ textAlign: "center" }}>
                                    <Button className="btn btn-secondary" type="submit">
                                        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Back</Link>
                                    </Button>
                                </div>

                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>

        </>
    )
}
