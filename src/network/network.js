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
export function buildPostRequestMail(jsonEmail){
     return new Request( `${urlSenGrid}`),{
          
               method: 'POST',
               headers: myHeaders,
               body: jsonEmail, //raw
               redirect: 'follow'
               
            } 

     }
/*
    return new Request({
    }, {
        method: 'POST',
        headers: myHeaders,
        body: jsonEmail, //raw
        redirect: 'follow'
     } )


          fetch("http://localhost:3001/api/send-email", requestOptions)
     .then(response => response.text())
     .then(result => console.log(result))
     .catch(error => console.log('error', error));

*/

