import {Router} from "express";
const router = Router();
import {authJwt} from "../middlewares/index.js";
import * as CitasController from "../controllers/cita.controller.js";

router.get("/getcitas",[authJwt.verifyToken, authJwt.isModerator], CitasController.getCitas, );
router.get("/getcita/:id",[authJwt.verifyToken, authJwt.isModerator], CitasController.getCitabyId);
router.post("/addcitas",[authJwt.verifyToken, authJwt.isModerator], CitasController.createCita);
router.delete("/deletecitas/:id",[authJwt.verifyToken, authJwt.isModerator], CitasController.deleteCita);
router.put("/updatecitas/:id",[authJwt.verifyToken, authJwt.isModerator], CitasController.updateCita);

export default router;