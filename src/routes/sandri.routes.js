import { Router } from "express";
// esta linea
import { methods as sangridController } from "../controllers/sendgrid.controller";
const router = Router();
router.post("/api/send-email",sangridController.sendEmailAcceptOrRefuse);

export default router;
