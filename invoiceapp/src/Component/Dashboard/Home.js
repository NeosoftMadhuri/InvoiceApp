import React, { useEffect,useState } from 'react'
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import { getinvoice } from '../Config/Myservice'
import styles from './Home.module.css'
export default function Home() {
    // const [unpaid,setUnpaid]=useState([])
    const [unamount,setUnamount]=useState([])
    const [unpaid,setUnpaid]=useState([])
    const [tamount,setTamount]=useState([])
    const [paid,setPaid]=useState([])
    const [pcount,setPcount]=useState(0)
    const [ucount,setUcount]=useState(0)
    const [tcount,setTcount]=useState(0)

    useEffect(()=>{
        getinvoice()
        .then(res=>{
            console.log(res.data)
            let invoicedata=res.data;
            
            //unpaid count
            let filter_data=invoicedata.data.filter(dt=>dt.status==='unpaid')
            setUcount(filter_data.length)
             setUnpaid(filter_data.reduce((prev,cur)=>prev+cur.insamount,0))

             //paid count
             let paid_data=invoicedata.data.filter(dt=>dt.status==='Paid')
             let count=paid_data.length;
             console.log(count)
             setPcount(count)
             setPaid(paid_data.reduce((prev,cur)=>prev+cur.insamount,0))

             //total count
             setTamount(invoicedata.data.reduce((prev,cur)=>prev+cur.insamount,0))
             setTcount(invoicedata.data.length)
        })

    },[])
    console.log(unamount)
    return (
        <>
            <Container fluid>
                <Navbar collapseOnSelect bg="dark" expand="lg" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">
                          <h5 style={{color:'white'}}>Invoice Application</h5>  
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            {/* <Link to="/addproduct" style={{ textDecoration: "none" ,color:"white",marginRight:"20px"}}>Add Product</Link> */}
                            <Link to="/addinvoice" style={{ textDecoration: "none" ,color:"white",marginRight:"20px",marginLeft:"20px"}}>Add Invoice</Link>
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

            </Container>
            <Container>
                <section>
                    <ul className={styles.autoGrid}>
                        <li className={styles.listItem} style={{ backgroundColor: '#1976d2', color: 'white' }}>
                            <div>
                                <p>{paid}</p>
                                <h2 style={{ color: 'white' }}>Payment Received</h2>
                            </div>
                            <div>
                                {/* <Check /> */}check
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{unpaid}</p>
                                <h2>Pending Amount</h2>
                            </div>
                            <div>
                                {/* <Pie /> */}pie
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{tamount}</p>
                                <h2>Total Amount</h2>
                            </div>
                            <div>
                                {/* <Bag /> */}bag
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{tcount}</p>
                                <h2>Total Invoices</h2>
                            </div>
                            <div>
                                {/* <Card /> */}card
                            </div>
                        </li>


                        <li className={styles.listItem} style={{ backgroundColor: '#206841', color: 'white' }}>
                            <div>
                                <p>{pcount}</p>
                                <h2 style={{ color: 'white' }}>Paid Invoices</h2>
                            </div>
                            <div>
                                {/* <Check /> */}check
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p></p>
                                <h2>Partially Paid Invoices</h2>
                            </div>
                            <div>
                                {/* <Pie /> */}pie
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{ucount}</p>
                                <h2>Unpaid Invoices</h2>
                            </div>
                            <div>
                                {/* <Frown /> */}frown
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p></p>
                                <h2>Overdue</h2>
                            </div>
                            <div>
                                {/* <Clock /> */}overdue
                            </div>
                        </li>
                    </ul>
                </section>
            </Container>
        </>
    )
}
