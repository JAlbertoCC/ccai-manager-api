

const sendEmailAcceptOrRefuse = async (req,mensaje, res) => {
    try {
  req.body
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

      console.log(result);
      res.json(result);

      
    } catch (error) {

      res.status(500);
      res.send(error.message);
    }
  };