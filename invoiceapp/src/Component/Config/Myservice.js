import axios from 'axios';
import {MAIN_URL} from './Url'
let token=localStorage.getItem('_token')
//LOGIN
export function login(data){
    return axios.post(`${MAIN_URL}user/login`,data);
}

export function sendEmail(data){
    return axios.post(`${MAIN_URL}user/sendmail`,data,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
    }) 
}

//REGISTER
export function register(data){
    return (console.log(data),axios.post(`${MAIN_URL}user/register`,data));
}

//SETTING
// export function settingData(data){
//     return (console.log(data));
// }
export function settingData(formdata){
    for(var abc of formdata.values())
        {
            console.log(abc)
        }
    return (console.log(formdata),axios.post(`${MAIN_URL}profile/setting`,formdata,{ headers: {'content-type': 'multipart/form-data'}}));
}

export function getdata(){
    return (console.log("get profile"),axios.get(`${MAIN_URL}profile/getdata`));
}

//ADD PRODUCT

export function invoicedata(data){
    return (console.log(data),axios.post(`${MAIN_URL}invoice/addinvoice`,data));
}
export function getinvoice(data){
    return (console.log("get invoice data"),axios.get(`${MAIN_URL}invoice/getinvoice`));
}
export function updateinvoice(insnum){
    return (console.log(insnum),axios.post(`${MAIN_URL}invoice/updateinvoice/${insnum}`));
}


export function uploaddata(data)
{
    return axios.post(`${MAIN_URL}upload/uploaddata`,data,{headers:{'Content-Type': 'multipart/form-data'}});
}

