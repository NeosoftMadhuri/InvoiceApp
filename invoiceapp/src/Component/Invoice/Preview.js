import React from 'react'
import { Container, Navbar, Image, Nav, Button, Table } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useHistory, useLocation } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { sendEmail } from '../Config/Myservice';

const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
}


export default function Preview() {
    const ref = React.createRef();
    const { state } = useLocation();
    console.log(state)
    const dt=state.user.ins_duedate;
    console.log(dt)
    let dt1=dt.toLocaleString()
    console.log(dt1)

    const sendMail = () => {
        // let abc = state.user.remail
        // console.log(abc);
        const input = document.getElementById("divToPrint");
        console.log(input);
        alert("Mail sent!!");
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg");
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            // console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            sendEmail(formData).then((res) => {
                console.log(res);
            });
        });
    };


    return (
        <>
            <div className="container p-3" style={{ height: "100%", width: "100%" }}>
                <div>
                    <nav class="navbar">
                        <div class="container-fluid">
                            <Link to="/home" style={{ textDecoration: "none" }}><Button variant='contained'>Go Back</Button></Link>
                            <Button className=" d-flex justify-content-sm-end">
                                <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0} y={0} scale={0.6}>
                                    {({ toPdf }) => (
                                        <Button onClick={() => {
                                            // sendData();
                                            toPdf();
                                        }} variant="contained">
                                            Save
                                        </Button>
                                    )}
                                </ReactToPdf>
                            </Button>
                            <Button variant='contained' onClick={sendMail}>Send mail</Button>

                        </div>
                    </nav>
                    <div ref={ref} id='divToPrint' className="container p-3" style={{ border: "2px solid grey", height: "900px", width: "800px" }}>

                        <nav class="navbar  navbar-light bg-light" >
                            <div class="container-fluid " style={{ height: "168px" }}>
                                <img src="Images/logo.jpeg" alt="" height="82px" width=" 185px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                                <h2 className='text-end'>INVOICE</h2>
                            </div>
                        </nav>
                        <div className='row m-0 border'>
                            <div className='col text-left ml-4'>
                                <h6>From</h6>
                                <h5>Firm Email</h5>
                                <br />
                                <h6>To</h6>
                                <h5>{state.user.rname}</h5>
                                <h5>{state.user.remail}</h5>
                                <h5>{state.user.raddress}</h5>
                            </div>
                            <div className='col text-right mr-4'>
                                <h6 style={{ textAlign: "right", marginRight: "15px" }}>Status</h6>
                                <h5 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "25px" }}>{state.user.status}</h5>
                                <br />
                                <h6 style={{ textAlign: "right", marginRight: "15px" }}>Due Date</h6>
                                
                                <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.ins_duedate}</h5>
                                <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                                <h4 style={{ textAlign: "right", marginRight: "15px" }}> INR {state.user.insamount}</h4>
                            </div>

                        </div>
                        <br />
                        <div className=" mb-2">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Sr no</th>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.user.product.map((pro, index) =>
                                        <tr key={index+1}>
                                            <td>{index+1}</td>
                                            <td>{pro.Item_name}</td>
                                            <td>{pro.Item_quant}</td>
                                            <td>{pro.Item_price}</td>
                                            <td>{pro.total}</td>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>

                            {/* 

                        <TableBody>
                            {state.user.product.map((ele, index) =>

                                <TableRow>
                                    <TableCell scope="row">{index + 1}</TableCell>
                                    <TableCell>{ele.title}</TableCell>
                                    <TableCell>{ele.quantity}</TableCell>
                                    <TableCell>{ele.price}</TableCell>
                                    <TableCell>{ele.total}</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table> */}
                        </div>

                        <Container className='d-flex flex-row-reverse'>


                            {/* <Table style={{width:"500px"}}>
                        <TableHead>
                            
                                <TableCell colSpan={2}><h3>Invoice Summary</h3></TableCell>
                            
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Sub Total:</TableCell>
                                <TableCell className='text-end'>{state.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>VAT(0%):</TableCell>
                                <TableCell className='text-end'>0</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total:</TableCell>
                                <TableCell className='text-end'>INR {state.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Paid:</TableCell>
                                <TableCell className='text-end'>INR{state.user.status ?  state.amount : 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><h4>Balance:</h4></TableCell>
                                <TableCell className='text-end'><b>INR{state.user.status ? 0  :  state.amount}</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}

                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}
