// porfavor no lo borres sandy : )
// este documento jala  o importa las variables de entorno que estan en env.
// a su ves en este documento será utilizando a lo largo del proyecto , ya que contiene información
import { config } from "dotenv";

config();

export default {
  host: process.env.HOST || "192.168.166.64",
  database: process.env.DATABASE || "sg_ccai_manager",
  user: process.env.USER || "Servidor-CCAI",
  password: process.env.PASSWORD || "ccai"
}