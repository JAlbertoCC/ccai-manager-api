
import * as api from "../utils/index.js"; 
// req,mensaje, res
const sendEmailAcceptOrRefuse = async (req, res) => {
  
  try {
    const {
      email
    } = req.body;

    const raw = {
      "personalizations": [
        {
          "to": [ 
            {
              "email": `${email}`,
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
    };
    
  const response = await api.sendigEmail(raw);
  res.status(200).json(response);
 

  } catch (error) {
    res.status(500).json(error.message);
  }
};


  export const methods = {
    sendEmailAcceptOrRefuse 
  };

  