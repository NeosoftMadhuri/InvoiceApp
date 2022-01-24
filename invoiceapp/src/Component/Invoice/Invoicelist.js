import React, { useEffect,useState } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form, Table } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import { getinvoice,updateinvoice} from '../Config/Myservice'
export default function Invoicelist() {
    const [allinvoice,setAllinvoice]=useState([]);
    const [status,setStatus]=useState();
    const navigate=useNavigate();
    useEffect(()=>{
        console.log("invoice list")
        getinvoice()
        .then(res=>{
            console.log(res.data)
            setAllinvoice(res.data.data)
        })

    },[])
    console.log(allinvoice)

    const changestatus=(insnum)=>{
        // setStatus()
        console.log("update")
        updateinvoice(insnum)
        .then(res=>{
            console.log(res.data)

        })
        getinvoice()
        .then(res=>{
            console.log(res.data)
            setAllinvoice(res.data.data)
        })
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
                            <Link to="/home" style={{ textDecoration: "none" ,color:"white",marginRight:"20px"}}>Home</Link>
                            <Link to="/addinvoice" style={{ textDecoration: "none" ,color:"white",marginRight:"20px"}}>Add Invoice</Link>
                            <Link to="/setting" style={{ textDecoration: "none" ,color:"white"}}>Setting</Link>
                            
                             

                            </Nav>
                            <Nav>
                                <Button variant="outline-secondary" className="mr-2"><Link to="/register" style={{ textDecoration: "none" }}>Logout</Link></Button>
                                {/* <Button variant="outline-secondary" className="ml-2"><Link to="/login" style={{ textDecoration: "none" }}>Login</Link></Button> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                  <h4>All Invoice Data</h4>
                  <Table>
                      <thead>
                          <tr>
                              <th>Invoice Number</th>
                              <th>Receiver Name</th>
                              <th>Receiver Email</th>
                              <th>Receiver address</th>
                              <th>Invoice Date</th>
                              <th>Invoice Due Date</th>
                              <th>Invoice Amound</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {allinvoice.map((pro)=>
                           <tr>
                           <td>{pro.insnum}</td>
                           <td>{pro.rname}</td>
                           <td>{pro.remail}</td>
                           <td>{pro.raddress}</td>
                           <td>{pro.insdate}</td>
                           <td>{pro.ins_duedate}</td>
                           <td>{pro.insamount}</td>
                           <td>{pro.status}
                           </td>
                           <td>
                           <Button className="m-3" onClick={()=>{changestatus(pro.insnum)}}>Edit</Button>
                           <Button className="m-3" onClick={()=>navigate('/preview',{state:{user:pro}})}>Preview</Button>
                           </td>
                       </tr>
                          )}
                         
                      </tbody>
                  </Table>
            </Container>

        </>
    )
}
