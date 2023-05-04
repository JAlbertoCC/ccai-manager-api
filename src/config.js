import { config } from "dotenv";

config();

export default {
  host: process.env.HOST || "192.168.166.64",
  database: process.env.DATABASE || "sg_ccai_manager",
  user: process.env.USER || "Servidor-CCAI",
  password: process.env.PASSWORD || "ccai"
}