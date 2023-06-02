import axios from 'axios';



export async function sendigEmail(jsonEmail) {
  const config = {
    headers:{
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    }
  };
  axios.post(
    `https://api.sendgrid.com/v3/mail/send`,
    JSON.stringify(jsonEmail),
    config
  )
  .then(response => {
    console.log('response, ', (response.statusCode))
  })
  .catch(error => {
    console.log(error)
  })
  

}
