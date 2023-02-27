import { config } from "dotenv";

config();

export default {
  host: process.env.HOST || "localhost",
  database: process.env.DATABASE || "sg_ccai_manager",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "Password1"
}