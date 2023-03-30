// porfavor no lo borres sandy : )
// este documento jala  o importa las variables de entorno que estan en env.
// a su ves en este documento será utilizando a lo largo del proyecto , ya que contiene información
import { config } from "dotenv";

config();

export default {
  host: process.env.HOST || "localhost",
  database: process.env.DATABASE || "sg_ccai_manager",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "ccai",
  // Esta es  la llave de sendgrid/ aquí  se debe de modificar 
  API_KEY_SENGRID   :  process.API_KEY_SENGRID || "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"
}