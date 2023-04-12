import { Router } from "express";
// esta linea
import { methods as sangridController } from "../controllers/sendgrid.controller";
const router = Router();
router.post("api/send-email", sangridController.sendEmailAcceptOrRefuse);
// router.post("https://api.sendgrid.com/v3/mail/send",sangridController.sendEmailAcceptOrRefuse);
// y ella bien bichi bichi
export default router;
