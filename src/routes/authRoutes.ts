import { Router } from "express";
import AuthController from "../controllers/authController";
import authenticateJWT from "../middleware/authMiddleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/change-password", authenticateJWT, AuthController.changePassword);

export default router;
