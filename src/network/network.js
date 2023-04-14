


const sgMail = require('@sendgrid/mail');
const { response } = require('express');
const API_KEY = "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"
sgMail.setApiKey(API_KEY);
const message = {
     to : "miguel.olveramc@gmail.com",
     from: "sandrafcortes@outlook.com",
     subject:" hola guapo sono michelagenlo",
     text :"Fuiste aceptado por el ccai y no por tu crush",
   
};

export function buildPostRequestMail(jsonmail) {
sgMail.
send(jsonmail)
.then((respose)=>console.log('Email sent...'))
.catch((error)=>console.log(error.message));

}

/*
no borrar porfavor:
Este pinche documento me va a servir para crear el docuemtno post d
*/
/*
require = require("esm")(module);
const urlSenGrid = "https://api.sendgrid.com/v3/mail/send";
*/

/*
const fetch = require('node-fetch');
const myHeaders = new fetch.Headers();

myHeaders.append("Authorization", "Bearer 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");
myHeaders.append("Content-Type", "application/json");
*/
/*
export function buildPostRequestMail(jsonEmail){

     return new Request( `${urlSenGrid}`,{
          
               method: 'POST',
               body: jsonEmail, //raw
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                  },
              
               redirect: 'follow'
               
            } )

            

     }
*/
//opcion dos 
/*
     export function buildPostRequestMail(jsonEmail) {
      
          const myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer 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");
          myHeaders.append("Content-Type", "application/json");
         
        
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: jsonEmail,
            redirect: 'follow'
          };
        
          return new Request("https://api.sendgrid.com/v3/mail/send", requestOptions);
        }
        */
   // la tercera  y ya a la verga     



  

  /*
   const fetch = require("node-fetch");

   function buildPostRequestMail(jsonEmail) {
     const myHeaders = new fetch.Headers();
     myHeaders.append("Authorization", "Bearer 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");
     myHeaders.append("Content-Type", "application/json");
   
     const requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: jsonEmail,
       redirect: 'follow'
     };
   
     fetch("https://api.sendgrid.com/v3/mail/send", requestOptions)
       .then(response => response.text())
       .then(result => console.log(result))
       .catch(error => console.log('error', error));
   }

  */



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

