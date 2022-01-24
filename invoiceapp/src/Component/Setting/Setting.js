import React, { useState, useRef, useEffect } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import styles from './Setting.module.css'
import { settingData, getdata } from '../Config/Myservice';
import FileBase64 from 'react-file-base64'
export default function Setting() {

    const cname = useRef('');
    // const [cname, setCname] = useState('');
    const [cemail, setCemail] = useState('');
    const [caddress, setCaddress] = useState('');
    const [clogo, setClogo] = useState('');
    const [data, setData] = useState('')
    const [edit, setEdit] = useState(false)
    const [errors, setError] = useState({ err_cname: '', err_caddress: '', err_cemail: '' })


    useEffect(() => {
        getdata()
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
    }, [])
    const handler = () => {

    }

    const updatedata = () => {

        // {data.profile.map((pro)=>
        //     // console.log(pro.cname)
        //     document.getElementById("cname").value=pro.cname
        //     )}
        setEdit(true)

    }


    const setting = () => {
        const Form_Data = new FormData();
        console.log(cname.current.value)

        // data.append('myfile',document.getElementById('myfile').files[0])

        // console.log(document.getElementById('myfile').files[0]);

        // let formdata = {clogo:document.getElementById('myfile').files[0], cname: cname, cemail: cemail, caddress: caddress }
        Form_Data.append('clogo', clogo)
        Form_Data.append('cname', cname.current.value)
        Form_Data.append('cemail', cemail)
        Form_Data.append('caddress', caddress)
        console.log(Form_Data.values())
        for (var abc of Form_Data.values()) {
            console.log(abc)
        }
        // settingData(Form_Data)
        //     .then(res => {
        //         if (res.data.err == 0) {
        //             console.log(res.data)
        //             alert("Done")
        //             // navigate('/')
        //         }
        //         if (res.data.err == 1) {
        //             console.log(res.data)
        //             alert("error")
        //         }
        //     })
    }

    return (
        <>
            <Container fluid>
                <Navbar collapseOnSelect bg="dark" expand="lg" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">
                            <Image src="Images/logo.jpg" width="110px" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Link to="/addproduct" style={{ textDecoration: "none" ,color:"white",marginRight:"20px"}}>Add Product</Link> */}
                                <Link to="/home" style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>Home</Link>
                                <Link to="/setting" style={{ textDecoration: "none", color: "white" }}>Setting</Link>



                            </Nav>
                            <Nav>
                                <Button variant="outline-secondary" className="mr-2"><Link to="/register" style={{ textDecoration: "none" }}>Logout</Link></Button>
                                {/* <Button variant="outline-secondary" className="ml-2"><Link to="/login" style={{ textDecoration: "none" }}>Login</Link></Button> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <section className={styles.hero}>
                    <h1>Profile Settings</h1>
                    <div className={styles.paragraph}>
                        <p>Edit/ update your business profile</p>
                    </div>
                    <div className="">
                        <Button variant="light" className="btn btn-outline-dark my-2 my-sm-0" onClick={updatedata}>Edit </Button>

                    </div>
                </section>


                <section className={styles.hero}>
                    <div className={styles.paragraph}>
                        {data.profile && data.profile.map((pro) =>
                            <Card className="m-3">

                                <Card.Body>
                                    <Card.Title>Company Name:{pro.cname}</Card.Title>
                                    <Card.Text>
                                        Email: {pro.cemail}
                                    </Card.Text>
                                    <Card.Text>
                                        Address: {pro.caddress}
                                    </Card.Text>

                                    <div className="">
                                        <Button variant="light" className="btn btn-outline-dark my-2 my-sm-0" onClick={updatedata}>Edit </Button>

                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </div>


                </section>
                {edit ?
                    <Form >
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Logo
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="file" placeholder="upload file" name="myfile" id="myfile" onChange={(e) => { setClogo(e.target.files[0]) }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Comapny Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Company name" name="cname" ref={cname} />

                                {/* <Form.Control type="text" placeholder="Company name" name="cname" onChange={(e) => { setCname(e.target.value) }} /> */}
                                {/* {address!=='' && address.length<10 && <span className="text-danger">Please enter  address correctly</span>} */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Comapny Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Enter Company Email " name="cemail" onChange={(e) => { setCemail(e.target.value) }} />
                                {/* {title!=='' && title.length<5 && <span className="text-danger">Please enter  title correctly</span>} */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Comapny Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Company address" name="caddress" onChange={(e) => { setCaddress(e.target.value) }} />
                                {/* {address!=='' && address.length<10 && <span className="text-danger">Please enter  address correctly</span>} */}
                            </Col>
                        </Form.Group>

                        <Button variant="primary" onClick={setting} >Add</Button>
                    </Form>
                    : ''}
                {/* {edit ?
                    <Row>
                        <Col sm={3} md={3} lg={3}></Col>
                        <Col sm={6} md={6} lg={6}>

                            <Form enctype="multipart/form-data" onSubmit={setting} >
                                <Form.Group className="mb-3" >
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control type="text" name="cname" id="cname"  onChange={(e)=>{setCname(e.target.value)}} placeholder="Enter Company Name" size="md" />
                                    <span style={{ color: 'red' }}>{errors.err_cname}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Company Email id</Form.Label>
                                    <Form.Control type="text" name="cemail"  ref={cemail} onChange={(e)=>{setCemail(e.target.value)}} placeholder="Enter Company Email id" size="md" />
                                    <span style={{ color: 'red' }}>{errors.err_cemail}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Company Address</Form.Label>
                                    <Form.Control type="text" name="caddress" id="caddress"  onChange={(e)=>{setCaddress(e.target.value)}} placeholder="Enter Company Address" size="md" />
                                    <span style={{ color: 'red' }}>{errors.err_caddress}</span>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Logo
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="file" placeholder="upload file" name="myfile" id="myfile" onChange={(e) => { setClogo(e.target.files[0]) }} />
                                    </Col>
                                </Form.Group>



                                <Row>
                                    <Col sm={12} md={12} lg={12}>
                                        <div style={{ textAlign: "center" }}>
                                            <Button className="btn btn-danger" type="submit">
                                                Submit
                                            </Button>
                                        </div>

                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col sm={3} md={3} lg={3}></Col>
                    </Row>
                    : ''} */}


            </Container>
        </>
    )
}
