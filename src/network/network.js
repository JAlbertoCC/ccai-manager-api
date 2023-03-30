/*
no borrar porfavor:
Este pinche documento me va a servir para crear el docuemtno post d
*/
const urlSenGrid = "https://api.sendgrid.com/v3/mail/send"
// Header 
var myHeaders = new Headers();

myHeaders.append("Authorization", "Bearer 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");
myHeaders.append("Content-Type", "application/json");


// esta es la mamada que estoy haciendo yo
// va a recibir dos cosas el json y la uri 
export function buildPostRequestMail(uri,jsonEmail){

    return new Request(`${urlSenGrid}${uri}` , {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(jsonEmail), //raw
        redirect: 'follow'
     } )

}
