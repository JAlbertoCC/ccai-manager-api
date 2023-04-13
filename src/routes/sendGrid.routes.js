import { Router } from "express";

import { methods as sangridController } from "../controllers/sendgrid.controller";

const router = Router();
router.post("/api/send-email", sangridController.sendEmailAcceptOrRefuse);

export default router;
