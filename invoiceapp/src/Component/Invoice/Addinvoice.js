import React, { useState, useRef } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import { invoicedata } from '../Config/Myservice'
import styles from './Invoice.module.css'
export default function Addinvoice() {
    const [errors, setError] = useState({ err_fname: '', err_lname: '', err_uname: '', err_mobile: '', err_email: '', err_pass: '', err_cpass: '' })
    const rname = useRef();
    const insnum = useRef();
    const remail = useRef();
    const raddress = useRef();
    const insdate = useRef();
    const ins_duedate = useRef();
    const insamount = useRef();
    const [Item_name, setitemname] = useState('');
    const [Item_quant, setitemquant] = useState('');
    const [Item_price, setitemprice] = useState('');
    const [Item_disc, setitemdisc] = useState('');
    const total=useRef('')
    const [product, setProduct] = useState({ productdata: [] })
    const [form, setForm] = useState(false)
    const navigate=useNavigate();

    const addInvoice = (event) => {
        event.preventDefault();
        let formdata = {
            insnum: insnum.current.value,rname:rname.current.value, remail: remail.current.value, raddress: raddress.current.value, insdate: insdate.current.value,
            ins_duedate: ins_duedate.current.value, insamount: insamount.current.value, product
        }

        console.log(formdata)
        invoicedata(formdata)
        .then(res=>{
            console.log(res.data)
            alert(res.data.msg)
            // navigate('/invoicelist')

        })
    }

    const addProduct = (event) => {
        console.log(product)
        event.preventDefault();
        console.log("add product here")
        let formdata = { Item_name: Item_name, Item_quant: Item_quant, Item_price: Item_price, Item_disc: Item_disc,total:total.current.value }
        console.log(formdata)
        setProduct({ ...product.productdata, productdata: formdata })

        setForm(false)
        
    }

    const handler = () => {

    }
    const showForm = () => {

        setForm(true);
    }
    return (
        <>
            <Container fluid className={styles.invoiceBackground}>
            <Navbar collapseOnSelect bg="dark" expand="lg" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">
                            <Image src="Images/logo.jpg" width="110px" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            {/* <Link to="/addproduct" style={{ textDecoration: "none" ,color:"white",marginRight:"20px"}}>Add Product</Link> */}
                            <Link to="/home" style={{ textDecoration: "none" ,color:"white",marginRight:"20px"}}>Home</Link>
                            <Link to="/invoicelist" style={{ textDecoration: "none" ,color:"white",marginRight:"20px"}}>All Invoice</Link>
                            <Link to="/setting" style={{ textDecoration: "none" ,color:"white"}}>Setting</Link>
                            
                             

                            </Nav>
                            <Nav>
                                <Button variant="outline-secondary" className="mr-2"><Link to="/register" style={{ textDecoration: "none" }}>Logout</Link></Button>
                                {/* <Button variant="outline-secondary" className="ml-2"><Link to="/login" style={{ textDecoration: "none" }}>Login</Link></Button> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Row>
                    <Col sm={1} md={1} lg={1}></Col>
                    <Col sm={10} md={10} lg={10}>
                        <Row style={{ textAlign: "center", marginTop: "30px" }}>
                            <h3>Invoice Application</h3>
                            <h4 className="my-3 mb-3">Add invoice details....</h4>
                        </Row>
                        <Row>
                            <Form method="post" onSubmit={addInvoice}>

                                <Row>
                                    <Col sm={6} md={6} lg={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Invoice Number</Form.Label>
                                            <Form.Control type="text" name="insnum" onChange={handler} className="form-control" ref={insnum} size="20" />
                                            <span style={{ color: 'red' }}>{errors.err_insnum}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} md={6} lg={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Receiver Name</Form.Label>
                                            <Form.Control type="text" name="rname" onChange={handler} ref={rname} className="form-control" size="20" />
                                            <span style={{ color: 'red' }}>{errors.err_lname}</span>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Row>
                                        <h5>Receiver Address</h5>
                                    </Row>
                                    <Row>

                                        <Col sm={6} md={6} lg={6}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label>Receiver Email id</Form.Label>
                                                <Form.Control type="text" name="remail" onChange={handler} ref={remail} className="form-control" size="20" />
                                                <span style={{ color: 'red' }}>{errors.err_remail

                                                }</span>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6} md={6} lg={6}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label>Receiver Address</Form.Label>
                                                <Form.Control type="text" name="raddress" onChange={handler} ref={raddress} className="form-control" size="20" />
                                                <span style={{ color: 'red' }}>{errors.err_raddress}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </Row>

                                <Row>
                                    <Col sm={6} md={6} lg={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Invoice Data</Form.Label>
                                            <Form.Control type="Date" name="insdate" onChange={handler} ref={insdate} className="form-control" size="20" />
                                            <span style={{ color: 'red' }}>{errors.err_insdate}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} md={6} lg={6}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Invoice DueDate</Form.Label>
                                            <Form.Control type="date" name="ins_duedate" ref={ins_duedate} onChange={handler} className="form-control" size="20" />
                                            <span style={{ color: 'red' }}>{errors.err_ins_duedate}</span>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button onClick={showForm} className='btn btn-primary'>+Add Product</Button>
                                    {form ?
                                        <Form>

                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Item Name</Form.Label>
                                                        <Form.Control type="text" name="item_name" onChange={(e) => { setitemname(e.target.value) }} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_item_name}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Item Quantity</Form.Label>
                                                        <Form.Control type="number" name="Item_quant" onChange={(e) => { setitemquant(e.target.value) }} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_ins_duedate}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Item Price Per Piece</Form.Label>
                                                        <Form.Control type="number" name="Item_price" onChange={(e) => { setitemprice(e.target.value) }} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_item_price}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Discount in %</Form.Label>
                                                        <Form.Control type="number" name="Item_disc" onChange={(e) => { setitemdisc(e.target.value) }} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_ins_disc}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Total</Form.Label>
                                                        <Form.Control type="number" name="total" ref={total} value={(Item_price - (Item_price * Item_disc / 100)) * Item_quant} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_total}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <div style={{ textAlign: "center" }}>
                                                        <Button type="button" className="btn btn-primary mb-3" onClick={addProduct}>Submit</Button>
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

                                        : ''}
                                </Row>

                                <Row>
                                    <Col sm={12} md={12} lg={12}>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Invoice Amount </Form.Label>
                                            <Form.Control type="number" name="insammount"  ref={insamount} className="form-control" size="20" />
                                            <span style={{ color: 'red' }}>{errors.err_uname}</span>
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
                    </Col>
                    <Col sm={1} md={1} lg={1}></Col>
                </Row>

            </Container>
        </>
    )
}
