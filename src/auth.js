const myHeaders = new Headers();
myHeaders.append("content-type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("client_id", "AMFJKbdo1SX1m1hKYNcMG8sO31fppJDF");
urlencoded.append("client_secret", "gYqx1-OEFhkJQSMIocnjLsPxPWuwGbFqUU8l4F3k4gD2eCRfHMzw-NGkWFQ_7yJN");
urlencoded.append("audience", "YOUR_API_IDENTIFIER");

export const getAccessToken = () => { 
  return {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
}

fetch("https://sandy55.auth0.com/oauth/token", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));