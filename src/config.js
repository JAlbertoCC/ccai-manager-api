// porfavor no lo borres sandy : )
// este documento jala  o importa las variables de entorno que estan en env.
// a su ves en este documento será utilizando a lo largo del proyecto , ya que contiene información
import { config } from "dotenv";

config();
export default {
  host: process.env.HOST || "192.168.166.97", 
  database: process.env.DATABASE || "sg_ccai_manager2",
  user: process.env.USER || "Servidor-CCAI",
  password: process.env.PASSWORD || "ccai"
}

//conexion local

/*
export default {
  host: process.env.HOST || "localhost",
  database: process.env.DATABASE || "sg_ccai_manager2",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "310101"       // password del mysql personal
}
*/


