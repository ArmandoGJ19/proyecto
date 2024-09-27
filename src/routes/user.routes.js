import {Router} from "express";

const router = Router();

import * as UserController from "../controllers/users.controller.js";

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/adduser", UserController.createUser);
router.delete("/deleteuser/:id", UserController.deleteUser);
router.put("/updateuser/:id", UserController.updatedUser);

export default router;