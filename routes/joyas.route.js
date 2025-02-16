import { joyasController } from "../controllers/joyas.controller.js";
import { Router } from "express";

const router = Router();

router.get("", joyasController.getJoyasAllController);

router.get("/filtros", joyasController.getJoyasFiltroController);

router.get("*", joyasController.getJoyasError);

export default router;
