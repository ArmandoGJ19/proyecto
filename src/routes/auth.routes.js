import {Router} from "express";
const router = Router();

import * as AuthController from "../controllers/auth.controller.js";

// router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);

export default router;