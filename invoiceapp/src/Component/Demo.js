import React,{useState} from 'react'
import { Container, Form,Button } from 'react-bootstrap'
import { uploaddata } from './Config/Myservice'

export default function Demo() {
    const [clogo,setClogo]=useState('null')

    const upddata=()=>{
    let data=new FormData();
    console.log(clogo)
    data.append("myfile",clogo)
    uploaddata(data)
    .then(res=>{
        console.log(res.data)
    })
    }
    return (
        <>
        <Container>
            <Form method="post" encType='multipart/form-data'> 
                <Form.Group className="mb-3">
                    <Form.Label>Logo</Form.Label>
                    <Form.Control type='file' name="myfile"onChange={(e) => { setClogo(e.target.files[0]) }} />
                </Form.Group>
            </Form>
            <Form.Group className="mb-3">
            <Button variant="primary" onClick={upddata} >Update</Button>

            </Form.Group>
           
        </Container>
            
        </>
    )
}
