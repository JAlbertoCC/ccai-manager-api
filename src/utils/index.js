import { buildPostRequestMail } from "../network/network";

export async function sendigEmail(jsonEmail)
{

  const request =   buildPostRequestMail ()
  const response =   await fetch(request)
  const data = response.ok ? await response.json():undefined
  return data

}