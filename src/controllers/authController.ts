import { Request, Response } from "express";
import AuthService from "../services/authService";

const AuthController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    try {
      const token = await AuthService.login(username, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(401).json({ message: "Ocorreu um erro desconhecido." });
      }
    }
  },

  changePassword: async (req: Request, res: Response) => {
    const { username } = req.user as { username: string };
    const { currentPassword, newPassword } = req.body;
    console.log(req.user)

    console.log(`Tentando trocar senha para usuário: ${username}`);
    console.log(`Senha atual: ${currentPassword}, Nova senha: ${newPassword}`);

    try {
      await AuthService.changePassword(username, currentPassword, newPassword);
      res.json({ message: "Senha atualizada com sucesso" });
    } catch (error) {
      console.error("Erro ao trocar a senha:", error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Ocorreu um erro desconhecido." });
      }
    }
  },
};

export default AuthController;
