
function sendEmail() {


    var raw = JSON.stringify({
        "personalizations": [
          {
            "to": [
              {
                "email": "miguel.olveramc@gmail.com",
                "name": "Billotazo"
              }
            ],
            "subject": "ENVIO DE MENSAJE DE PRUEBA DEL CCAI!"
          }
        ],
        "content": [
          {
            "type": "text/plain",
            "value": "Wi will rock you perros!"
          }
        ],
        "from": {
          "email": "sandrafcortes@outlook.com",
          "name": "Sam Smith"
        }
      });
      
  




  }




/*
function sendEmail(toEmail, toName, subject, message) {
    var emailData = {
      "personalizations": [
        {
          "to": [
            {
              "email": toEmail,
              "name": toName
            }
          ],
          "subject": subject
        }
      ],
      "content": [
        {
          "type": "text/plain",
          "value": message
        }
      ],
      "from": {
        "email": "sandrafcortes@outlook.com",
        "name": "CCAI "
      }
    };
    return data;
  }


*/